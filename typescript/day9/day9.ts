import { exists } from 'fs/exists.ts'
import { move } from './core_function.ts'

const args = Deno.args
if (args.length !== 1) {
  console.log(`Expected 1 argument, received ${args.length}`)
  Deno.exit(1)
}

if (!exists(args[0])) {
  console.log(`File does not exist ${args[0]}`)
  Deno.exit(1)
}

const start = performance.now()
const contents: string[] = Deno.readTextFileSync(args[0]).split('\n').filter((line) => line !== '')

let short_rope = [
  [0, 0],
  [0, 0],
]
let short_tail_visited = [[0, 0]]

let long_rope = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
]
let long_tail_visited = [[0, 0]]

for (const line of contents) {
  let line_parsed = line.split(' ')

  move(short_rope, short_tail_visited, line_parsed[0], parseInt(line_parsed[1]))
  move(long_rope, long_tail_visited, line_parsed[0], parseInt(line_parsed[1]))
}
console.log(`The number of positions visited by the short tail is ${short_tail_visited.length}`)
console.log(`The number of positions visited by the tail of the whole rope is ${long_tail_visited.length}`)
console.log(`Calculated in ${(performance.now() - start).toPrecision(5)}ms`)
