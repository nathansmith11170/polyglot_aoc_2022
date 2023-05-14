import { interpretLineAsActionAndOutcome, interpretLineAsTwoActions } from '../src/core_function'

describe('interpretLineAsTwoActions', () => {
  test('Line A X', () => {
    expect(interpretLineAsTwoActions('A X')).toBe(4)
  })
  test('Line A Y', () => {
    expect(interpretLineAsTwoActions('A Y')).toBe(8)
  })
  test('Line A Z', () => {
    expect(interpretLineAsTwoActions('A Z')).toBe(3)
  })
  test('Line B X', () => {
    expect(interpretLineAsTwoActions('B X')).toBe(1)
  })
  test('Line B Y', () => {
    expect(interpretLineAsTwoActions('B Y')).toBe(5)
  })
  test('Line B Z', () => {
    expect(interpretLineAsTwoActions('B Z')).toBe(9)
  })
  test('Line C X', () => {
    expect(interpretLineAsTwoActions('C X')).toBe(7)
  })
  test('Line C Y', () => {
    expect(interpretLineAsTwoActions('C Y')).toBe(2)
  })
  test('Line C Z', () => {
    expect(interpretLineAsTwoActions('C Z')).toBe(6)
  })
})

describe('interpretLineAsActionAndOutcome', () => {
  test('Line A X', () => {
    expect(interpretLineAsActionAndOutcome('A X')).toBe(3)
  })
  test('Line A Y', () => {
    expect(interpretLineAsActionAndOutcome('A Y')).toBe(4)
  })
  test('Line A Z', () => {
    expect(interpretLineAsActionAndOutcome('A Z')).toBe(8)
  })
  test('Line B X', () => {
    expect(interpretLineAsActionAndOutcome('B X')).toBe(1)
  })
  test('Line B Y', () => {
    expect(interpretLineAsActionAndOutcome('B Y')).toBe(5)
  })
  test('Line B Z', () => {
    expect(interpretLineAsActionAndOutcome('B Z')).toBe(9)
  })
  test('Line C X', () => {
    expect(interpretLineAsActionAndOutcome('C X')).toBe(2)
  })
  test('Line C Y', () => {
    expect(interpretLineAsActionAndOutcome('C Y')).toBe(6)
  })
  test('Line C Z', () => {
    expect(interpretLineAsActionAndOutcome('C Z')).toBe(7)
  })
})
