export const allCharactersAreUniqueIn = (slice: string): boolean => {
  const chars: string[] = []
  for (const c of slice) {
    if (chars.includes(c)) return false
    else chars.push(c)
  }
  return true
}