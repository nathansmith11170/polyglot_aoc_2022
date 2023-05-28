import { exists } from "fs/exists.ts";
import { allCharactersAreUniqueIn } from "./core_function.ts";

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

let window_size = 4
for (let i = 0; i < contents.length - window_size; ++i) {
  const slice = contents.substring(i, i + window_size)
  if (allCharactersAreUniqueIn(slice)) {
    console.log(`Characters processed before first start of packet: ${i + window_size}`)
    break
  }
}

window_size = 14
for (let i = 0; i < contents.length - window_size; ++i) {
  const slice = contents.substring(i, i + window_size)
  if (allCharactersAreUniqueIn(slice)) {
    console.log(`Characters processed before first start of message: ${i + window_size}`)
    break
  }
}
console.log(`Calculated in ${(performance.now() - start).toPrecision(5)}ms`)