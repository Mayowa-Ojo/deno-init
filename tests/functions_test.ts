import { assertEquals } from "https://deno.land/std@v0.35.0/testing/asserts.ts";
import { prompt } from "../utils/functions"

Deno.test({
   name: "should execute callback function",
   fn: async () => {
      await prompt('test case 1', () => {
         const text = 'test case 1';
         assertEquals(text, 'test case 1');
      });
   }
})

await Deno.runTests();