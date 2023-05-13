import * as fs from 'fs'

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

const input = fs.readFileSync('src/input.txt', 'utf-8')

const stop = startStopwatch()
// Code to be timed goes here
const inventories =
  input
    .split('\n\n')
    .filter(isNotOnlyWhitespaceOrEmpty)
    .map(calculateCalories)
    .sort(descending)

console.log(`Largest: ${inventories[0]}`)
console.log(`Top three: ${inventories.slice(0, 3).reduce((sum, current) => { return sum + current }, 0)}`)
console.log(`Elapsed time: ${stop().toFixed(3)} milliseconds`)
