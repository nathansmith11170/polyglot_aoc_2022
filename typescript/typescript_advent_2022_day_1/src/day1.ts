import * as fs from 'fs'
import * as process from "process";
import * as constants from "constants";

export function calculateCalories (inventory: string): number {
  return inventory.split('\n')
    .map(str => str.trim())
    .filter(isNotOnlyWhitespaceOrEmpty)
    .map(parseIntRadix10)
    .reduce((sum, current) => {
      return sum + current
    }, 0)
}

export function descending (a: number, b: number): number {
  return b - a
}

function isNotOnlyWhitespaceOrEmpty (str: string): boolean {
  if (str.trim().length === 0) return false
  else return str.length !== 0
}

function parseIntRadix10 (str: string): number {
  return parseInt(str, 10)
}

function startStopwatch (): () => number {
  const startTime = performance.now()
  return () => performance.now() - startTime
}

const args = process.argv;
if (args.length != 3) {
  console.log(`Expected 3 arguments, received ${args.length} - ${args}`)
  process.exit(1)
}
fs.access(args[1], constants.F_OK, (err) => {
  console.log(err)
  process.exit(1)
})

const stop = startStopwatch()
const input = fs.readFileSync('src/input.txt', 'utf-8')
const inventories =
  input
    .split('\n\n')
    .filter(isNotOnlyWhitespaceOrEmpty)
    .map(calculateCalories)
    .sort(descending)

console.log(`Largest: ${inventories[0]}`)
console.log(`Top three: ${inventories.slice(0, 3).reduce((sum, current) => { return sum + current }, 0)}`)
console.log(`Elapsed time: ${stop().toFixed(3)} milliseconds`)
process.exit(0)
