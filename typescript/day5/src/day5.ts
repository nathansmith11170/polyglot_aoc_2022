import { exists } from 'fs/exists.ts'
import {
  readStartingStacksIntoMatrix,
  reverseRows,
  transposeMatrix,
  removeWhitespaceAndEmpty,
  removeBrackets
} from './read_source.ts'
import {
  executeMoveOneCrateAtATime,
  executeMoveOneStackAtAtime
} from './perform_move.ts'

const args = Deno.args
if (args.length !== 1) {
  console.log(`Expected 1 argument, received ${args.length}`)
  Deno.exit(1)
}

if (!exists(args[0])) {
  console.log(`File does not exist ${args[0]}`)
  Deno.exit(1)
}

const start = performance.now()
const decoder = new TextDecoder('utf-8')
const contents: string = decoder.decode(Deno.readFileSync(args[0]))

const newline_newline_index: number = contents.indexOf('\n\n')
const stacks_start: string[] = contents.substring(0, newline_newline_index).split('\n')
const moves: string[] = contents.substring(newline_newline_index + 2, contents.length).split('\n')

let stacks: string[][] = readStartingStacksIntoMatrix(stacks_start)
stacks = transposeMatrix(stacks)
stacks = reverseRows(stacks)
stacks = removeWhitespaceAndEmpty(stacks)
stacks = removeBrackets(stacks)

const mover9000Result = stacks.map(row => [...row])
const mover9001Result = stacks.map(row => [...row])

for (const move of moves) {
  executeMoveOneCrateAtATime(mover9000Result, move)
}

for (const move of moves) {
  executeMoveOneStackAtAtime(mover9001Result, move)
}

const top_after_9000 = mover9000Result.map(stack => stack[stack.length - 1])
  .reduce((string, current) => {
    return string + current 
  }, "")

const top_after_9001 = mover9001Result.map(stack => stack[stack.length - 1])
  .reduce((string, current) => {
    return string + current 
  }, "")

console.log(`Moving one at a time, the top of each stack is ${top_after_9000}`)
console.log(`Moving multiple at a time, the top of each stack is ${top_after_9001}`)
console.log(`Calculated in ${(performance.now() - start).toPrecision(5)}ms`)
