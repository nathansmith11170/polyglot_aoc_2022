export function splitStringInTwo (str: string): string[] {
  return [
    str.substring(0, str.length / 2),
    str.substring(str.length / 2, str.length)
  ]
}

export function findDuplicateCharacters (strings: string[]): string[] {
  const result: string[] = []
  for (const c1 of strings[0]) {
    for (const c2 of strings[1]) {
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

export function chunkArray (arr: any[], width: number): any[][] {
  const result: any[][] = []

  for (let i = 0; i < arr.length; i += width) {
    const chunk = arr.slice(i, i + width)
    result.push(chunk)
  }

  return result
}

export function findCommonCharacter (arr: string[]): string {
  for (const c of arr[0]) {
    let inAll = true
    for (const str of arr) {
      if (!str.includes(c)) {
        inAll = false
      }
    }
    if (inAll) return c
  }
  return ''
}
