// >cli tool for bootstrapping deno project<
import { parse, readLines } from "./deps.ts";
import * as content from "./utils/file_content.ts";
import { mapQuestionsToIndex, questions, questionsMap } from "./utils/questions.ts";
import * as func from "./utils/functions.ts";

// globals 
const { args, exit } = Deno;
const regex = /[\.]ts$/;

interface Options {
   boolean?: string[];
   [propName: string]: any;
}
const options: Options = {
   boolean: ['array of strings to always treat as boolean']
}

const flags = {
   "--y || -base": "set up basic project structure",
   "--h || -help": "list cli usage",
   "--u || -update": "upgrade to latest version"
}

/**
 * starts the readable stream
 */
async function read(): Promise<void> {
   let indexCount = 1;
   let filename: string;
   let resolved: boolean;
   let canProceed: boolean = false;

   const validInputs = ['yes', 'y', 'no', 'n'];
   const isValidInput = (input: string) => validInputs.includes(input.toLowerCase()) ? true : false;

   for await(const line of readLines(Deno.stdin)) {
      // check if user doesn't enter a value
      if(line == '' && indexCount !== 1) {
         func.throwError('input field cannot be blank', false, 'ERROR');
      }

      // user wants to exit
      if(line.toLowerCase() == 'exit') {
         func.throwError('exiting cli', true, 'INFO');
      }

      switch(indexCount) {
         case 1:
            filename = line == '' ? 'mod.ts' : line;

            // run an initial check for invalid filename
            if(!Boolean(regex.exec(filename))) {
               func.throwError('invalid filename: file must have <.ts> extension', false, 'ERROR');

               // if input is invalid, enter another readable stream 
               while (!canProceed) {

                  for await(const subLine of readLines(Deno.stdin)) {

                     if(!Boolean(regex.exec(subLine))) {
                        func.throwError('invalid filename: file must have <.ts> extension', false, 'ERROR');
                     } else {
                        canProceed = true;
                        filename = subLine;
                        break;
                     }
                  }
               }

            }

            const exists = await func.generateFile(filename, '');

            await func.handleFileExists(exists, filename);
            indexCount++;
            canProceed = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 2:
            filename = "Makefile";

            resolved = await func.resolveResponse(line, filename, content.content_makefile);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, content.content_makefile);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 3:

            filename = "import_map.json";

            resolved = await func.resolveResponse(line, filename, content.content_importmap);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, content.content_importmap);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 4:

            filename = "tsconfig.json";

            resolved = await func.resolveResponse(line, filename, content.content_tsconfig);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, content.content_tsconfig);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 5:

            filename = "tests";
            resolved = await func.resolveResponse(line, filename, '', true);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, '', true);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 6:

            filename = ".gitignore";

            resolved = await func.resolveResponse(line, filename, content.content_gitignore);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, content.content_gitignore);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 7:

            filename = ".env";

            resolved = await func.resolveResponse(line, filename, content.content_dotenv);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, content.content_dotenv);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 8:

            filename = "README.md";

            resolved = await func.resolveResponse(line, filename, content.content_readme);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, content.content_readme);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 9:

            filename = "LICENCE";

            resolved = await func.resolveResponse(line, filename, content.content_licence);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, content.content_licence);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
            break;

         case 10:

            filename = "types.d.ts";

            resolved = await func.resolveResponse(line, filename, content.content_types);

            if(!resolved) {
               const [validated, input] = await func.forceValidInput(isValidInput, 'invalid input', canProceed);

               if(validated) {
                  await func.resolveResponse(input, filename, content.content_types);
                  indexCount++
                  resolved = false;
                  func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));
                  break;
               }
            }

            indexCount++
            resolved = false;
            func.ask(mapQuestionsToIndex(questionsMap, questions, indexCount));

            // check termination condition
            func.willTerminate(indexCount, questionsMap);
            break;

         default:
            exit(0);
      }
   }
}

(async function main(): Promise<void> {
   func.prompt(questions.I, async () => {
      await read();
   });

})();
