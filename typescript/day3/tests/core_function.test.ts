import { findDuplicateCharacters, splitStringInTwo, translateCharacterToPriority } from '../src/core_function.ts'
import { assertEquals } from 'testing/asserts.ts'

Deno.test('splitStringInTwo, splits string with even length', () => {
  const result = splitStringInTwo('aaaabbbb')
  assertEquals(result, ['aaaa', 'bbbb'])
})

Deno.test('findDuplicateCharacters, returns empty array when no duplicates', () => {
  const result = findDuplicateCharacters(['aaaa', 'bbbb'])
  assertEquals(result, [])
})
Deno.test('findDuplicateCharacters, returns array of duplicate characters', () => {
  const result = findDuplicateCharacters(['AnDhYu', 'AkDtYu'])
  assertEquals(result, ['A', 'D', 'Y', 'u'])
})

Deno.test('translateCharacterToPriority, p is 16', () => {
  const result = translateCharacterToPriority('p')
  assertEquals(result, 16)
})
Deno.test('translateCharacterToPriority, P is 42', () => {
  const result = translateCharacterToPriority('P')
  assertEquals(result, 42)
})
Deno.test('translateCharactertoPriority, L is 38', () => {
  const result = translateCharacterToPriority('L')
  assertEquals(result, 38)
})
