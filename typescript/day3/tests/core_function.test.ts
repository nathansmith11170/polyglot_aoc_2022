import {findDuplicateCharacters, splitStringInTwo, translateCharacterToPriority} from '../src/core_function'

describe('splitStringInTwo', () => {
  test('splits string with even length', () => {
    expect(splitStringInTwo('aaaabbbb')).toStrictEqual(['aaaa', 'bbbb'])
  })
})

describe('findDuplicateCharacters', () => {
  test('returns empty array when no duplicates', () => {
    expect(findDuplicateCharacters(['aaaa', 'bbbb'])).toStrictEqual([])
  })
  test('returns array of duplicate characters', () => {
    expect(findDuplicateCharacters(['AnDhYu', 'AkDtYu'])).toStrictEqual(['A', 'D', 'Y', 'u'])
  })
})

describe('translateCharacterToPriority', () => {
  test('p is 16', () => {
    expect(translateCharacterToPriority('p')).toBe(16)
  })
  test('P is 42', () => {
    expect(translateCharacterToPriority('P')).toBe(42)
  })
  test('L is 38', () => {
    expect(translateCharacterToPriority('L')).toBe(38)
  })
})