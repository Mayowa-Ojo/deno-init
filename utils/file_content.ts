export const content_makefile: string = `
# make commands

init: 
   deno mod.ts

`;

export const content_importmap:string = `
{
   "imports": {
      "flags/": "https://deno.land/std@v0.35.0/flags/",
      "fs/": "https://deno.land/std@v0.35.0/fs/",
      "io/": "https://deno.land/std@v0.35.0/io/",
      "log/": "https://deno.land/std@v0.35.0/log/",
      "fmt/": "https://deno.land/std@v0.35.0/fmt/"
   }
}
`;

export const content_tsconfig = `
{
   "compilerOptions": {
     "allowJs": true,
     "esModuleInterop": true,
     "lib": [
        "esnext",
        "dom"
      ],
     "module": "esnext",
     "moduleResolution": "node",
     "emitDecoratorMetadata": true,
     "experimentalDecorators": true,
     "noEmit": true,
     "pretty": true,
     "resolveJsonModule": true,
     "target": "esnext",
     "baseUrl": "src",
      "paths": {
      }
   },
   "include": [
     "./**/*.ts"
   ]   
 }
`;