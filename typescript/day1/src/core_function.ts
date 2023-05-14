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

export function isNotOnlyWhitespaceOrEmpty (str: string): boolean {
  if (str.trim().length === 0) return false
  else return str.length !== 0
}

function parseIntRadix10 (str: string): number {
  return parseInt(str, 10)
}

export function startStopwatch (): () => number {
  const startTime = performance.now()
  return () => performance.now() - startTime
}
