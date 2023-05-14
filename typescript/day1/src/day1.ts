import * as fs from 'fs'
import * as process from 'process'
import { startStopwatch, descending, calculateCalories, isNotOnlyWhitespaceOrEmpty } from './core_function'

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
const inventories =
  input
    .split('\n\n')
    .filter(isNotOnlyWhitespaceOrEmpty)
    .map(calculateCalories)
    .sort(descending)

const topThree = inventories.slice(0, 3).reduce((sum, current) => { return sum + current }, 0)
console.log(`Largest: ${inventories[0]}`)
console.log(`Top three: ${topThree}`)
console.log(`Elapsed time: ${stopwatch().toFixed(3)} milliseconds`)
process.exit(0)
