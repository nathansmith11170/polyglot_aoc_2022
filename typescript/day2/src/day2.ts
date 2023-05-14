import * as fs from 'fs'
import { startStopwatch, interpretLineAsTwoActions, interpretLineAsActionAndOutcome } from './core_function'

const args = process.argv
if (args.length !== 3) {
  console.log(`Expected 3 arguments, received ${args.length}`)
  process.exit(1)
}

fs.access(args[2], fs.constants.F_OK, (err) => {
  console.log(err)
  process.exit(1)
})

const stopwatch = startStopwatch()
const input = fs.readFileSync(args[2], 'utf-8')

const scoreIfLinesAreActions = input.split('\n')
  .filter(str => str.length > 0)
  .map(interpretLineAsTwoActions)
  .reduce((sum, current) => { return sum + current }, 0)

const scoreIfLinesAreActionAndOutcome = input.split('\n')
  .filter(str => str.length > 0)
  .map(interpretLineAsActionAndOutcome)
  .reduce((sum, current) => { return sum + current }, 0)

console.log(`Score if each line is two actions: ${scoreIfLinesAreActions}`)
console.log(`Score if each line is an action and outcome: ${scoreIfLinesAreActionAndOutcome}`)
console.log(`Elapsed time: ${stopwatch().toFixed(3)} milliseconds`)
process.exit(0)
