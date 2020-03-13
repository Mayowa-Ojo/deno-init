const content_makefile: string = `
# make commands

init: 
   deno mod.ts

`;

const content_importmap:string = `
{
   "imports": {
      "flags/": "https://deno.land/std@v0.35.0/flags/",
      "fs/": "https://deno.land/std@v0.35.0/fs/",
      "io/": "https://deno.land/std@v0.35.0/io/",
      "log/": "https://deno.land/std@v0.35.0/log/",
      "fmt/": "https://deno.land/std@v0.35.0/fmt/"
   }
}
`

export {
   content_makefile,
   content_importmap
}