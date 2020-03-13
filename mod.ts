// >cli tool for bootstrapping deno project<
import { parse, exists, readLines, writeFileStr, c } from "./deps.ts";
import { content_makefile } from "./utils/file_content.ts";

// globals 
const { args, exit } = Deno;
const { log } = console;
const regex = /[\.]ts$/;

const mapQuestionsToIndex = new Map;
mapQuestionsToIndex.set('1', 'I');
mapQuestionsToIndex.set('2', 'II');
mapQuestionsToIndex.set('3', 'III');
mapQuestionsToIndex.set('4', 'IV');
mapQuestionsToIndex.set('5', 'V');
mapQuestionsToIndex.set('6', 'VI');
mapQuestionsToIndex.set('7', 'VII');
mapQuestionsToIndex.set('8', 'VIII');
mapQuestionsToIndex.set('9', 'IX');
mapQuestionsToIndex.set('10', 'X');

interface Options {
   boolean?: string[];
   [propName: string]: any;
}
const options: Options = {
   boolean: ['array of strings to always treat as boolean']
}

interface Questions {
   [propName: string]: string
}
const questions: Questions = {
   I: "New project huh, what's your entry file? <Default: mod.ts>",
   II: "Interesting you chose deno, should I generate a Makefile [yes(y) || no(n)]",
   III: "Would you like to use import maps? [yes(y) || no(n)]",
   IV: "How do you feel about a tsconfig? [yes(y) || no(n)]",
   V: "How about a test folder in the root directory? [yes(y) || no(n)]",
   VI: "Mind if I add a .gitignore? [yes(y) || no(n)]",
   VII: "You need a .env file don't you? [yes(y) || no(n)]",
   VIII: "I presume you want a README.md [yes(y) || no(n)]",
   IX: "LICENCE? If yes, what type? [yes(y) [ISC, MIT] || no(n)]",
   X: "I suggest you use type definitions(types.d.ts) [yes(y) || no(n)]",
   XI: "Your project is structured. Happy building",
}

const flags = {
   "--y || -base": "set up basic project structure",
   "--h || -help": "list cli usage",
   "--u || -update": "upgrade to latest version"
}

async function prompt (text: string, callback: Function): Promise<void> {
   log(`${c.cyan("-->")} ${text}`);
   return await callback();
}

async function generateFile(filename: string, content: string, overwrite?: boolean): Promise<boolean> {
   // check if file exixts
   
   if(overwrite) {
      try {
         await Deno.remove(`./${filename}`);
      } catch (err) {
         throwError(err.message, true);
      }
   }

   const fileExists: boolean = await exists(`./${filename}`);

   if(fileExists) {
      return fileExists;
   }

   try {
      await writeFileStr(filename, content);
      return fileExists;
   } catch(err) {
      throwError(err.message, true);
      return false;
   }
}

function ask(question: string): void {
   console.log(`${c.green("-> [INFO]")}: ${question}`);
   return;
}

// function parse(args, key): string {
//    return args[key];
// }
function throwError(message: string, willExit: boolean): void {
   if(message == 'exiting cli') {
      log(`${c.green("[INFO]")}: ${message}`);
      exit(0);
      return;
   }

   log(`${c.red("[Error]")}: ${message}`);
   willExit? exit(0) : null;
   return;
}

async function handleFileExists(exists: boolean, filename: string): Promise<void> {

   if(exists) {
      ask('[WARNING]: file already exixts, do you want to overwrite?');
      for await(const subLine of readLines(Deno.stdin)) {
         if(subLine.toLowerCase() == 'yes' || subLine.toLowerCase() == 'y') {
            generateFile(filename, '', true);
            break;
         }

         if(subLine.toLowerCase() == 'no' || subLine.toLowerCase() == 'n') {
            break;
         }
      }
   }

}

async function resolveResponse(res: string, filename: string, content: string): Promise<boolean> {
   if(res.toLowerCase() == 'yes' || res.toLowerCase() == 'y') {

      const exists = await generateFile(filename, content);
      await handleFileExists(exists, filename);

      return true;
   }

   if(res.toLowerCase() == 'no' || res.toLowerCase() == 'n') {
      return true;
   }

   throwError('Invalid input', false);
   return false;
}

async function forceValidInput(condition: Function, errMsg: string, canProceed: boolean): Promise<boolean> {
   while (!canProceed) {
                  
      for await(const subLine of readLines(Deno.stdin)) {
         
         if(!condition(subLine)) {
            throwError(errMsg, false);
         } else {
            break;
         }
      }
      break;
   }

   return true;
}

async function read(): Promise<void> {
   // const holdQuestion: string[] = [];
   let indexCount = 1;
   let filename: string;
   let resolved: boolean;
   let canProceed: boolean = false;

   const validInputs = ['yes', 'y', 'no', 'n'];
   const isValidInput = (input: string) => validInputs.includes(input.toLowerCase()) ? true : false;

   for await(const line of readLines(Deno.stdin)) {
      // console.log(`Your entry: ${line}`);
      // check if user doesn't enter a value
      if(line == '' && indexCount !== 1) {
         throwError('input field cannot be blank', false);
      }

      // user wants to exit
      if(line.toLowerCase() == 'exit') {
         throwError('exiting cli', true);
      }

      switch(indexCount) {
         case 1:
            filename = line == '' ? 'mod.ts' : line;

            // run an initial check for invalid filename
            if(!Boolean(regex.exec(filename))) {
               throwError('invalid filename: file must have <.ts> extension', false);

               // if input is invalid, enter another readable stream 
               while (!canProceed) {

                  for await(const subLine of readLines(Deno.stdin)) {
                     
                     if(!Boolean(regex.exec(subLine))) {
                        throwError('invalid filename: file must have <.ts> extension', false);
                     } else {
                        canProceed = true;
                        filename = subLine;
                        break;
                     }
                  }
               }

            }

            const exists = await generateFile(filename, '');

            await handleFileExists(exists, filename);
            indexCount++;
            canProceed = false;
            ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            break;

         case 2:
            filename = "Makefile";

            resolved = await resolveResponse(line, filename, content_makefile);

            if(!resolved) {
               const validated = await forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  console.log('file created');
                  indexCount++
                  resolved = false;
                  ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
                  break;
               }
            }

         case 3:

            filename = "import_map.json";

            resolved = await resolveResponse(line, filename, content_makefile);

            if(!resolved) {
               const validated = await forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  console.log('file created');
                  indexCount++
                  resolved = false;
                  ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
                  break;
               }
            }

         case 4:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               log('invalid input');
            }
            break;

         case 5:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               log('invalid input');
            }
            break;

         case 6:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               log('invalid input');
            }
            break;

         case 7:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               log('invalid input');
            }
            break;

         case 8:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               log('invalid input');
            }
            break;

         case 9:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;               
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);

               if(questions[mapQuestionsToIndex.get((indexCount+1).toString())] == undefined) {
                  exit(0);
               }
            } else {
               log('invalid input');
            }case 10:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;
               if(questions[mapQuestionsToIndex.get(indexCount.toString())] == undefined) {
                  exit(0);
               }
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               log('invalid input');
            }
            break;

         default:
            exit(0);
      }
   }
}

(async function main(): Promise<any> {
   prompt(questions.I, async () => {
      await read();
   });

})();
