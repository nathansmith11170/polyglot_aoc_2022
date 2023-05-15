import { calculateCalories, descending } from '../src/core_function'

describe('calculateCalories', () => {
  test('given newline delimited string returns sum', () => {
    expect(calculateCalories('1\n2\n3\n\n')).toBe(6)
  })
  test('given one value returns value', () => {
    expect(calculateCalories('\n1\n')).toBe(1)
  })
  test('given working example returns sum', () => {
    expect(calculateCalories('\n    8424\n    4933\n    2202\n    8871\n    9421\n    1163\n    10520\n    2527\n')).toBe(48061)
  })
})

describe('descending', () => {
  test('given a list of numbers sorts in descending order', () => {
    expect([4, 2, 4, 3, 2, 6, 1].sort(descending)).toStrictEqual([6, 4, 4, 3, 2, 2, 1])
  })
})
