import { calculateCalories, descending } from '../src/core_function.ts'
import { assertEquals } from 'testing/asserts.ts'

Deno.test('calculateCalories, given newline delimited string returns sum', () => {
  const result = calculateCalories('1\n2\n3\n\n')
  assertEquals(result, 6)
})
Deno.test('calculateCalories, given one value returns value', () => {
  const result = calculateCalories('\n1\n')
  assertEquals(result, 1)
})

Deno.test('calculateCalories, given working example returns sum', () => {
  const result = calculateCalories(
    '\n    8424\n    4933\n    2202\n    8871\n    9421\n    1163\n    10520\n    2527\n',
  )
  assertEquals(result, 48061)
})

Deno.test('descending, given a list of numbers sorts in descending order', () => {
  const result = [4, 2, 4, 3, 2, 6, 1].sort(descending)
  assertEquals(result, [6, 4, 4, 3, 2, 2, 1])
})
