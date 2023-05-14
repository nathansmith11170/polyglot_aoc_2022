import { calculateCalories, descending } from '../src/core_function'

describe('calculateCalories', () => {
  test('given newline delimited string returns sum', () => {
    expect(calculateCalories('1\n2\n3\n\n')).toBe(6)
  })
  test('given one value returns value', () => {
    expect(calculateCalories('\n1\n')).toBe(1)
  })
  test('given working example returns sum', () => {
    expect(calculateCalories(`
    8424
    4933
    2202
    8871
    9421
    1163
    10520
    2527
`)).toBe(48061)
  })
})

describe('descending', () => {
  test('given a list of numbers sorts in descending order', () => {
    expect([4, 2, 4, 3, 2, 6, 1].sort(descending)).toStrictEqual([6, 4, 4, 3, 2, 2, 1])
  })
})
