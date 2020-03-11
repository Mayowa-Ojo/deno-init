// >cli tool for bootstrapping deno project<
import { parse, exists, readLines, writeFileStr } from "./deps.ts";
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
   log(`--> ${text}`);
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
   console.log(`-> [INFO]: ${question}`);
   return;
}

// function parse(args, key): string {
//    return args[key];
// }
function throwError(message: string, willExit: boolean): void {
   if(message == 'exiting cli') {
      log(`[INFO]: ${message}`);
      exit(0);
      return;
   }

   log(`[Error]: ${message}`);
   willExit? exit(0) : null;
   return;
}

async function read(): Promise<void> {
   // const holdQuestion: string[] = [];
   let indexCount = 1;

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
            const filename: string = line == '' ? 'mod.ts' : line;

            if(!Boolean(regex.exec(filename))) {
               throwError('invalid filename: file must have <.ts> extension', false);
            }

            const exists = await generateFile(filename, '');

            if(exists) {
               ask('[WARNING]: file already exixts, do you want to overwrite?');
               for await(const subLine of readLines(Deno.stdin)) {
                  if(subLine.toLowerCase() == 'yes' || subLine.toLowerCase() == 'y') {
                     generateFile(filename, 'new content <smile>', true);
                     break;
                  }

                  if(subLine.toLowerCase() == 'no' || subLine.toLowerCase() == 'n') {
                     break;
                  }
               }
            }

            indexCount++;
            ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            break;
         case 2:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               generateFile('Makefile', content_makefile);
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
               break;
            }
 
            log('invalid input');
            break;
         case 3:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               log('invalid input');
            }
            break;
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
