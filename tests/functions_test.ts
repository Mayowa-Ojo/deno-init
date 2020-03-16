import { assertEquals } from "../deps.ts";
import { prompt } from "../utils/functions.ts"

Deno.test({
   name: "should execute callback function",
   fn: async () => {
      await prompt('test case 1', () => {
         const text = 'test case 1';
         assertEquals(text, 'test case 1');
      });
   }
})

// await Deno.runTests();