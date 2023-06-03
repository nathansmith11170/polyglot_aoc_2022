import { exists } from "fs/exists.ts"
import { countVisibleTrees, getMaxScenicScore } from "./core_function.ts"

const args = Deno.args
if (args.length !== 1) {
  console.log(`Expected 1 argument, received ${args.length}`)
  Deno.exit(1)
}

if (!exists(args[0])) {
  console.log(`File does not exist ${args[0]}`)
  Deno.exit(1)
}

const start = performance.now();
const decoder = new TextDecoder('utf-8')
const contents: string[] = decoder.decode(Deno.readFileSync(args[0])).split('\n').filter(line => line !== "")

const matrix: number[][] = []
for (const line of contents) {
  matrix.push([])
  for (const char of line) {
    matrix[matrix.length-1].push(parseInt(char, 10))
  }
}

const visible_trees = countVisibleTrees(matrix)
const max_scenic_score = getMaxScenicScore(matrix)

console.log(`The number of visible trees is ${visible_trees}`)
console.log(`The max scenic score is ${max_scenic_score}`)
console.log(`Calculated in ${(performance.now() - start).toPrecision(5)}ms`)
