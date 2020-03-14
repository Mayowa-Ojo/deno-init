import { exists, readLines, writeFileStr, ensureDir, c } from "../deps.ts";

/**
 * Utitlity functions
 */

const { exit } = Deno;
const { log } = console;
/**
 * prompts user for input
 * @param text - stdout message
 * @param callback - function to execute after receiving response
 * @returns {any}- return value from callback
 */
export async function prompt (text: string, callback: Function): Promise<void> {
   console.log(`${c.cyan(">")} ${text}`);
   return await callback();
}

/**
 * generates a file or directory
 * @param name - file/directory name
 * @param content - file content
 * @param overwrite - overwrite if file exists
 * @param isfolder should create file or directory
 * @returns {boolean} - success/failure
 */
export async function generateFile(name: string, content: string, overwrite?: boolean, isfolder?: boolean): Promise<boolean> {
   // check if file exixts

   if(overwrite) {
      try {
         await Deno.remove(`./${name}`);
      } catch (err) {
         throwError(err.message, true, 'ERROR');
      }
   }

   const fileExists: boolean = isfolder ? false : await exists(`./${name}`);

   if(fileExists) {
      return fileExists;
   }

   try {
      if(isfolder) {
         console.log('creating foler...')
         await ensureDir(`./${name}`);
         return false;
      }

      await writeFileStr(name, content);
      return fileExists;
   } catch(err) {
      throwError(err.message, true, 'ERROR');
      return false;
   }
}

/**
 * prompt client for response without callback
 * @param question - question client needs to respond to
 * @returns - void
 */
export function ask(question: string): void {
   log(`${c.green("<INFO>")}: ${question}`);
   return;
}

// function parse(args, key): string {
//    return args[key];
// }

type ERROR = string;
type INFO = string;
type WARNING = string;

type Error = ERROR
   | INFO
   | WARNING

/**
 * throws an error message after failed execution
 * @param message - error message
 * @param willExit - should process exit after throwing error or fail silently
 * @param errType - error type [ERROR, WARNING, INFO]
 * @returns - void
 */
export function throwError(message: string, willExit: boolean, errType?: string): void {
   if(!errType) {
      errType = 'INFO';
   }
   
   if(message == 'exiting cli') {
      log(`${c.green(`<${errType}>`)}: ${message}`);
      exit(0);
      return;
   }

   log(`${c.red(`<${errType}>`)}: ${message}`);
   willExit? exit(0) : null;
   return;
}

/**
 * handles subsequent response if file provided already exists
 * @param exists - true if the file already exists
 * @param filename - file name
 * @param isfolder - should create file or directory
 * @returns {Promise} - void
 */
export async function handleFileExists(exists: boolean, filename: string, isfolder?: boolean): Promise<void> {

   if(exists) {
      throwError('file already exists, do you want to overwrite?', false, 'WARNING');
      for await(const subLine of readLines(Deno.stdin)) {
         if(subLine.toLowerCase() == 'yes' || subLine.toLowerCase() == 'y') {
            generateFile(filename, '', true, isfolder ? true : false);
            break;
         }

         if(subLine.toLowerCase() == 'no' || subLine.toLowerCase() == 'n') {
            break;
         }

         // TODO: force valid input if input is not valid
      }
   }

}

/**
 * handles response from client
 * @param res - input from client
 * @param filename - file name
 * @param content - file content
 * @param isfolder - should create file/directory
 * @returns {boolean} - success/failure indicator
 */
export async function resolveResponse(res: string, filename: string, content: string, isfolder?: boolean): Promise<boolean> {
   if(res.toLowerCase() == 'yes' || res.toLowerCase() == 'y') {

      const exists = await generateFile(filename, content, false, isfolder ? true : false);
      await handleFileExists(exists, filename, isfolder ? true : false);

      return true;
   }

   if(res.toLowerCase() == 'no' || res.toLowerCase() == 'n') {
      return true;
   }

   throwError('Invalid input', false, 'ERROR');
   return false;
}

/**
 * forces client to provide valid input by spawning another readLine loop
 * @param condition - evaluates the next input with condition provided
 * @param errMsg - error message
 * @param canProceed - can execution continue after resolving input
 * @returns {[boolean, string]} - validation result and the valid input
 */
export async function forceValidInput(condition: Function, errMsg: string, canProceed: boolean): Promise<[boolean, string]> {
   let validInput: string = '';

   while (!canProceed) {

      for await(const subLine of readLines(Deno.stdin)) {

         if(!condition(subLine)) {
            throwError(errMsg, false, 'ERROR');
         } else {
            validInput = subLine;
            break;
         }
      }
      break;
   }

   return [true, validInput];
}

/**
 * determines if the questions map have been exhausted and need to exit process
 * @param currIndex - the current index of questions map
 * @returns - void
 */
export function willTerminate(currIndex: number, questionsMap: Map<string, string>): void {
   if(currIndex == questionsMap.size) {
      exit(0);
   }
}