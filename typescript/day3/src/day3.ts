import {
  chunkArray,
  findCommonCharacter,
  findDuplicateCharacters,
  splitStringInTwo,
  translateCharacterToPriority,
} from './core_function.ts'
import { exists } from 'fs/exists.ts'

const args = Deno.args
if (args.length !== 1) {
  console.log(`Expected 1 argument, received ${args.length}`)
  Deno.exit(1)
}

if (!exists(args[0])) {
  console.log(`File does not exist ${args[0]}`)
  Deno.exit(1)
}

const stopwatch = performance.now()
const decoder = new TextDecoder('utf-8')
const contents = decoder.decode(Deno.readFileSync(args[0])).split('\n')
const sumDuplicates = contents
  .map(splitStringInTwo)
  .flatMap(findDuplicateCharacters)
  .map(translateCharacterToPriority)
  .reduce((sum: number, current: number) => {
    return sum + current
  }, 0)

const sumBadges = chunkArray(contents, 3)
  .map(findCommonCharacter)
  .map(translateCharacterToPriority)
  .reduce((sum, current) => {
    return sum + current
  }, 0)

console.log(`Sum of duplicate items: ${sumDuplicates}`)
console.log(`Sum of badges in trios: ${sumBadges}`)
console.log(`Elapsed time: ${(performance.now() - stopwatch).toPrecision(5)} milliseconds`)
Deno.exit(0)
