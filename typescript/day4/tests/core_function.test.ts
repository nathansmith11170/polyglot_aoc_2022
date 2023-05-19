import { oneRangeContainsTheOther, oneRangeOverlapsWithTheOther } from "../src/core_function.ts"
import { assertFalse, assert } from "testing/asserts.ts"

Deno.test('oneRangeContainsTheOther, when left is within right returns true', () => {
    const result = oneRangeContainsTheOther(['2-4', '1-5'])

    assert(result)
})

Deno.test('oneRangeContainsTheOther, when not true returns false', () => {
    const result = oneRangeContainsTheOther(['2-4', '5-7'])

    assertFalse(result)
})

Deno.test('oneRangeContainsTheOther, when right is within left returns true', () => {
    const result = oneRangeContainsTheOther(['1-5', '2-4'])

    assert(result)
})

Deno.test('oneRangeOvelrappingWithTheOther, when part of left is in right returns true', () => {
    const result = oneRangeOverlapsWithTheOther(['2-7', '1-5'])

    assert(result)
})

Deno.test('oneRangeOverlappingWithTheOther, when not true returns false', () => {
    const result = oneRangeOverlapsWithTheOther(['2-4', '5-7'])

    assertFalse(result)
})

Deno.test('oneRangeOverlappingWithTheOther, when part of right is in left returns true', () => {
    const result = oneRangeOverlapsWithTheOther(['1-5', '2-7'])

    assert(result)
})