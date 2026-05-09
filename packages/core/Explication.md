# CORE
This directory I'll


## Dependencies and Commands

### Dependencies

- Install all the dependencies of TypeScript

```bash
pnpm add -D typescript tsup tsx @types/node
```

### Commands

- Create `tsconfig.json` to set the rules that it'll be following 

```bash
pnpm tsc --init
```

## Scripts

how each script works...

- **dev**

````Bash
tsx watch src/index.ts
````
`tsx`: Executes TypeScript directly without needing build it.

`watch`: Restart the program automatically when it detects that a file has been saved.


- **build**

````Bash
tsup src/index.ts --config --format cjs,esm --dts --clean
````

`tsup`: A faster bundler for Node.js libraries.

`--config`: Use the configuration defined in tsconfig.

`--format cjs,esm`: Generates two different versions: `CommonJS` and `ESM`.

`--dts`: Generates `.d.ts` files for compatibility with other TypeScript packages.

`--clean`: Removes the previous build folder `dist/` before starting.

- **typecheck**

````Bash
tsc --noEmit
````

`tsc`: The TypeScript Compiler.
`--noEmit`: Only checks for TypeScript errors without generating JavaScript output files.

