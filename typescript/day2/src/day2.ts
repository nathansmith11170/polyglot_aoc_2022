import { interpretLineAsActionAndOutcome, interpretLineAsTwoActions } from './core_function.ts'
import { exists } from 'fs/exists.ts'

const args = Deno.args
if (args.length !== 1) {
  console.log(`Expected 3 arguments, received ${args.length}`)
  Deno.exit(1)
}

if (!exists(args[0])) {
  console.log(`The file ${args[0]} does not exist`)
  Deno.exit(1)
}

const start = performance.now()
const decoder = new TextDecoder('utf-8')
const input = decoder.decode(Deno.readFileSync(args[0]))

const scoreIfLinesAreActions = input.split('\n')
  .filter((str) => str.length > 0)
  .map(interpretLineAsTwoActions)
  .reduce((sum, current) => {
    return sum + current
  }, 0)

const scoreIfLinesAreActionAndOutcome = input.split('\n')
  .filter((str) => str.length > 0)
  .map(interpretLineAsActionAndOutcome)
  .reduce((sum, current) => {
    return sum + current
  }, 0)

console.log(`Score if each line is two actions: ${scoreIfLinesAreActions}`)
console.log(`Score if each line is an action and outcome: ${scoreIfLinesAreActionAndOutcome}`)
console.log(`Elapsed time: ${(performance.now() - start).toPrecision(5)} milliseconds`)
Deno.exit(0)
