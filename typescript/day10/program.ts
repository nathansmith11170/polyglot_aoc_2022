import fs from 'fs'

const contents = fs.readFileSync('input.txt', { encoding: 'utf8' })

const start = performance.now()
const significantTimes = [20, 60, 100, 140, 180, 220]
const recordsPart1: Array<[number, number]> = [[1, 1]]
let register = 1

for (const line of contents.split('\r\n')) {
  const last = recordsPart1.at(-1)
  if (last === undefined) throw new Error('malformed records list, could not find last')
  if (line.trim().toLowerCase().includes('noop')) {
    recordsPart1.push([last[0] + 1, register])
  } else {
    const splitLine = line.trim().split(' ')
    if (splitLine[1] === undefined) throw new Error('malformed addx command, expected value')
    const val = parseInt(splitLine[1], 10)
    recordsPart1.push([last[0] + 1, register])
    register += val
    recordsPart1.push([last[0] + 2, register])
  }
}

const sumOfSignal = recordsPart1
  .filter((v) => significantTimes.includes(v[0]))
  .map((v) => {
    console.log(`clock:${v[0]}\t-\tstrength:${v[1]}`)
    return v[0] * v[1]
  }).reduce((sum, current) => sum + current, 0)
console.log(`Sum of signal strengths at times of interest: ${sumOfSignal}`)

const recordsPart2: string[] =
  recordsPart1.map((record) =>
    record[0] % 40 >= record[1] && record[0] % 40 <= record[1] + 2
      ? '#'
      : '.')
for (let row = 1; row < 6; row++) recordsPart2.splice(40 * row, 0, '\n')

console.log(recordsPart2.join(''))
console.log(`Elapsed time: ${(performance.now() - start).toPrecision(5)} milliseconds`)
