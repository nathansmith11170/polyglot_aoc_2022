import { calculateCalories, descending, isNotOnlyWhitespaceOrEmpty } from './core_function.ts'
import { exists } from 'fs/exists.ts'

const args = Deno.args
if (args.length !== 1) {
  console.log(`Expected 3 arguments, received ${args.length}`)
  Deno.exit(1)
}

if (!exists(args[0])) {
  console.log(`File does not exist ${args[0]}`)
  Deno.exit(1)
}

const start = performance.now()
const decoder = new TextDecoder('utf-8')
const input = decoder.decode(Deno.readFileSync(args[0]))
const inventories = input
  .split('\n\n')
  .filter(isNotOnlyWhitespaceOrEmpty)
  .map(calculateCalories)
  .sort(descending)

const topThree = inventories.slice(0, 3)
  .reduce((sum: number, current: number) => {
    return sum + current
  }, 0)
console.log(`Largest: ${inventories[0]}`)
console.log(`Top three: ${topThree}`)
console.log(`Elapsed time: ${(performance.now() - start).toPrecision(5)} milliseconds`)
Deno.exit(0)
