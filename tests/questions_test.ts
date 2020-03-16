import { assertEquals } from "../deps.ts";
import { mapQuestionsToIndex } from "../utils/questions.ts";

Deno.test({
   name: "should retrieve target question at index",
   fn: () => {
      const map: Map<string, string> = new Map;
      map.set('1', 'I');
      map.set('2', 'II');
      map.set('3', 'III');
      map.set('4', 'IV');
      map.set('5', 'V');

      const questions = {
         I: "enter your name",
         II: "your age?",
         III: "your location?"
      }
      const target = mapQuestionsToIndex(map, questions, 2);
      assertEquals(target, "your age?");
   }
});

// await Deno.runTests();