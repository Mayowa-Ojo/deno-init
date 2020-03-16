// import { assertEquals } from "./deps.ts";
import { assertEquals } from "https://deno.land/std@v0.35.0/testing/asserts.ts";

Deno.test({
   name: "passes tests",
   fn: () => {
      
      assertEquals("sample", "sample");
      assertEquals({ pkg: "std-lib" }, { pkg: "std-lib" });
   }
});

await Deno.runTests();