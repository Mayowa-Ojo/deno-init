// cli tool that generates deno project structure
import { parse } from "https://deno.land/std@v0.35.0/flags/mod.ts";
import { readLines } from "https://deno.land/std@v0.35.0/io/bufio.ts";
import { exists } from "https://deno.land/std@v0.35.0/fs/mod.ts";

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
   II: "Interesting you chose deno, should I generate import maps? [yes(y) || no(n)]",
   III: "How do you feel about a Makefile? [yes(y) || no(n)]",
   IV: "How about a test folder in the root directory? [yes(y) || no(n)]",
   V: "Mind if I add a .gitignore? [yes(y) || no(n)]",
   VI: "You need a .env file don't you? [yes(y) || no(n)]",
   VII: "I presume you want a README.md [yes(y) || no(n)]",
   VIII: "LICENCE? If yes, what type? [yes(y) [ISC, MIT] || no(n)]",
   IX: "I suggest you use type definitions(types.d.ts) [yes(y) || no(n)]",
   X: "Your project is structured. Happy building",
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

async function generateFile(filename: string): Promise<void> {
   // check if file exixts
   const fileExists: boolean = await exists(`./${filename}`);
   if(fileExists) {
      throwError('file already exists, do you want to overwrite?', false);
      return;
   }
}

function ask(question: string): void {
   console.log(`-> ${question}`);
   return;
}

// function parse(args, key): string {
//    return args[key];
// }
function throwError(message: string, willExit: boolean): void {
   log(`Error: ${message}`);
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
            if(!Boolean(regex.exec(line))) {
               throwError('invalid filename: file must have <.ts> extension', false);
            } else if(line.toLowerCase() == '') {
               generateFile('mod.ts');
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               generateFile(line);
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            }
            break;
         case 2:
            if(line.toLowerCase() == 'yes' || line.toLowerCase() == 'y') {
               log('file created');
               indexCount++;
               ask(questions[mapQuestionsToIndex.get(indexCount.toString())]);
            } else {
               log('invalid input');
            }
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
