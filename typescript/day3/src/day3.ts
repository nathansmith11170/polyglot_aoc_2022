import * as fs from 'fs'
import { findDuplicateCharacters, splitStringInTwo, translateCharacterToPriority } from './core_function'
function startStopwatch (): () => number {
  const startTime = performance.now()
  return () => performance.now() - startTime
}

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
const sum = fs.readFileSync(args[2], 'utf-8').split('\n')
  .map(splitStringInTwo)
  .flatMap(findDuplicateCharacters)
  .map(translateCharacterToPriority)
  .reduce((sum, current) => { return sum + current }, 0)

console.log(sum)
console.log(`Elapsed time: ${stopwatch().toFixed(3)} milliseconds`)
process.exit(0)
