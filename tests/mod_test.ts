import { assertEquals } from "../deps.ts";

Deno.test({
   name: "passes tests",
   fn: () => {
      
      assertEquals("sample", "sample");
      assertEquals({ pkg: "std-lib" }, { pkg: "std-lib" });
   }
});

// await Deno.runTests();