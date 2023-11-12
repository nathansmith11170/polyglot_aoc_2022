import fs from 'fs'

let contents: string
try {
  contents = fs.readFileSync('input.txt', { encoding: 'utf8' })
} catch (err) {
  console.log(err)
  process.exit(1)
}

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

const recordsPart2: boolean[] = []
for (const record of recordsPart1) {
  if (record[0] % 40 >= record[1] && record[0] % 40 <= record[1] + 2) {
    recordsPart2.push(true)
  } else {
    recordsPart2.push(false)
  }
}

let display = ''
for (const [index, pixel] of recordsPart2.entries()) {
  if (pixel) {
    display += '#'
  } else {
    display += '.'
  }
  if ((index + 1) % 40 === 0) {
    display += '\n'
  }
}
console.log(display)

console.log(`Elapsed time: ${(performance.now() - start).toPrecision(5)} milliseconds`)
