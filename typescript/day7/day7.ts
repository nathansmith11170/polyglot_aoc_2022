import { exists } from "fs/exists.ts";
import { findSmallestDirectorySizeLargerThan, readOutputIntoDirectory, sumDirectoriesSmallerThan } from "./core_function.ts";

const args = Deno.args;
if (args.length !== 1) {
  console.log(`Expected 1 argument, received ${args.length}`);
  Deno.exit(1);
}

if (!exists(args[0])) {
  console.log(`File does not exist ${args[0]}`);
  Deno.exit(1);
}

const start = performance.now();
const decoder = new TextDecoder('utf-8')
const contents: string = decoder.decode(Deno.readFileSync(args[0]))

const dir = readOutputIntoDirectory(contents)
console.log(`The sum of directories smaller than 100k is: ${sumDirectoriesSmallerThan(dir, 100000)}`)

const total_space = 70000000
const update_space_required = 30000000
const free_space = total_space - dir.getSize()
const free_space_needed = update_space_required - free_space
console.log(`The largest directory that provides at least ${free_space_needed} is ${findSmallestDirectorySizeLargerThan(dir, free_space_needed)}`)

console.log(`Calculated in ${(performance.now() - start).toPrecision(5)}ms`)