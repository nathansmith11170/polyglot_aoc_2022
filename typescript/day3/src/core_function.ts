export function splitStringInTwo (str: string): string[] {
  return [str.substring(0, str.length / 2), str.substring(str.length / 2, str.length)]
}

export function findDuplicateCharacters (strs: string[]): string[] {
  const result: string[] = []
  for (const c1 of strs[0]) {
    for (const c2 of strs[1]) {
      if (c1 === c2 && !result.includes(c1)) {
        result.push(c1)
      }
    }
  }
  return result
}

export function translateCharacterToPriority (char: string): number {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return alphabet.indexOf(char) + 1
}
