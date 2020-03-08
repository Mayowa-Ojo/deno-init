// cli tool that generates deno project structure
// import { parse } from "https://deno.land/std/flags/mod.ts";
import { readLines } from "https://deno.land/std@v0.35.0/io/bufio.ts";

// globals
const { args, exit } = Deno;
const { log } = console;

interface Options {
   boolean?: string;
   [propName: string]: any;
}

const options: Options = {
   boolean: 'array of strings to always treat as boolean'
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
   await callback();
}

function parse() {

}

async function read(): Promise<void> {
   // let answer: string = "";
   
   for await(const line of readLines(Deno.stdin)) {
      console.log(`Your entry: ${line}`);
      exit(0)
   }
   // return await answer;
}

(async function main(): Promise<any> {
   await prompt(questions.I, async () => {
      await read();
      // if(answer == 'mod.ts') {
      //    console.log('file created...')
      //    exit(0);
      // } else {
      //    console.log('invalid filename!');
      //    exit(0);
      // }
   });

})();


// console.log(parse(args));