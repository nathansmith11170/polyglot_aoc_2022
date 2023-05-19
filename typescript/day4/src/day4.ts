import { exists } from 'fs/exists.ts'
import { countRangeWithinRange, countRangesOverlapping } from './core_function.ts'

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
const contents = decoder.decode(Deno.readFileSync(args[0])).split('\n')

const fullyOverlappingAsisgnments = countRangeWithinRange(contents)
const partiallyOverlappingAssignments = countRangesOverlapping(contents)

console.log(`There are ${fullyOverlappingAsisgnments} fully overlapping assignments`)
console.log(`There are ${partiallyOverlappingAssignments} partiallly overlapping assignments`)
console.log(`Calculated in ${(performance.now() - start).toPrecision(5)}ms`)