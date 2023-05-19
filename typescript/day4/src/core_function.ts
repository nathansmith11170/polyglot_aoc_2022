export const countRangeWithinRange = (contents: string[]): number => {
    let count = 0
    for (const line of contents) {
        if (oneRangeContainsTheOther(line.split(','))) {
            count++
        }
    }
    return count
}

export const countRangesOverlapping = (contents: string[]): number => {
    let count = 0
    for (const line of contents) {
        if(oneRangeOverlapsWithTheOther(line.split(','))) {
            count++
        }
    }
    return count
}

export const oneRangeOverlapsWithTheOther = (ranges: string[]) => {
    const rangeOne = ranges[0].split('-').map(numeric => parseInt(numeric, 10))
    const rangeTwo = ranges[1].split('-').map(numeric => parseInt(numeric, 10))

    if (rangeOne[0] >= rangeTwo[0] && rangeOne[0] <= rangeTwo[1]) return true
    if (rangeTwo[0] >= rangeOne[0] && rangeTwo[0] <= rangeOne[1]) return true
    return false

}

export const oneRangeContainsTheOther = (ranges: string[]) => {
    const rangeOne = ranges[0].split('-').map(numeric => parseInt(numeric, 10))
    const rangeTwo = ranges[1].split('-').map(numeric => parseInt(numeric, 10))

    if (rangeOne[0] >= rangeTwo[0] && rangeOne[1] <= rangeTwo[1]) return true
    if (rangeTwo[0] >= rangeOne[0] && rangeTwo[1] <= rangeOne[1]) return true
    return false
}