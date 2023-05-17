import { interpretLineAsActionAndOutcome, interpretLineAsTwoActions } from '../src/core_function.ts'
import { assertEquals } from 'testing/asserts.ts'

Deno.test('interpretLineAsTwoActions, Line A X', () => {
  const result = interpretLineAsTwoActions('A X')
  assertEquals(result, 4)
})
Deno.test('interpretLineAsTwoActions, Line A Y', () => {
  const result = interpretLineAsTwoActions('A Y')
  assertEquals(result, 8)
})
Deno.test('interpretLineAsTwoActions, Line A Z', () => {
  const result = interpretLineAsTwoActions('A Z')
  assertEquals(result, 3)
})
Deno.test('interpretLineAsTwoActions, Line B X', () => {
  const result = interpretLineAsTwoActions('B X')
  assertEquals(result, 1)
})
Deno.test('interpretLineAsTwoActions, Line B Y', () => {
  const result = interpretLineAsTwoActions('B Y')
  assertEquals(result, 5)
})
Deno.test('interpretLineAsTwoActions, Line B Z', () => {
  const result = interpretLineAsTwoActions('B Z')
  assertEquals(result, 9)
})
Deno.test('interpretLineAsTwoActions, Line C X', () => {
  const result = interpretLineAsTwoActions('C X')
  assertEquals(result, 7)
})
Deno.test('interpretLineAsTwoActions, Line C Y', () => {
  const result = interpretLineAsTwoActions('C Y')
  assertEquals(result, 2)
})
Deno.test('interpretLineAsTwoActions, Line C Z', () => {
  const result = interpretLineAsTwoActions('C Z')
  assertEquals(result, 6)
})

Deno.test('interpretLineAsActionAndOutcome, Line A X', () => {
  const result = interpretLineAsActionAndOutcome('A X')
  assertEquals(result, 3)
})
Deno.test('interpretLineAsActionAndOutcome, Line A Y', () => {
  const result = interpretLineAsActionAndOutcome('A Y')
  assertEquals(result, 4)
})
Deno.test('interpretLineAsActionAndOutcome, Line A Z', () => {
  const result = interpretLineAsActionAndOutcome('A Z')
  assertEquals(result, 8)
})
Deno.test('interpretLineAsActionAndOutcome, Line B X', () => {
  const result = interpretLineAsActionAndOutcome('B X')
  assertEquals(result, 1)
})
Deno.test('interpretLineAsActionAndOutcome, Line B Y', () => {
  const result = interpretLineAsActionAndOutcome('B Y')
  assertEquals(result, 5)
})
Deno.test('interpretLineAsActionAndOutcome, Line B Z', () => {
  const result = interpretLineAsActionAndOutcome('B Z')
  assertEquals(result, 9)
})
Deno.test('interpretLineAsActionAndOutcome, Line C X', () => {
  const result = interpretLineAsActionAndOutcome('C X')
  assertEquals(result, 2)
})
Deno.test('interpretLineAsActionAndOutcome, Line C Y', () => {
  const result = interpretLineAsActionAndOutcome('C Y')
  assertEquals(result, 6)
})
Deno.test('interpretLineAsActionAndOutcome, Line C Z', () => {
  const result = interpretLineAsActionAndOutcome('C Z')
  assertEquals(result, 7)
})
