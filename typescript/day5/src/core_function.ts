export const readStartingStacksIntoMatrix = (starting_stacks: string[]): string[][] => {
  const stacks: string[][] = []

  for (let row = 0; row < starting_stacks.length; ++row) {
    let column_index = 0
    stacks[row] = []
    for (let window = 0; window < starting_stacks[row].length; window += 4) {
      stacks[row].push(starting_stacks[row].substring(column_index * 4, (column_index + 1) * 4))
      column_index++
    }
  }

  return stacks
}

export const transposeMatrix = (matrix: string[][]): string[][] => {
  const n = matrix.length
  const m = matrix[0].length
  const result: string[][] = []
  for (let i = 0; i < n; ++i) {
    result[i] = []
    for (let j = 0; j < m; ++j) {
      result[i][j] = ''
    }
  }

  for (let row = 0; row < n; ++row) {
    for (let col = 0; col < m; ++col) {
      result[col][row] = matrix[row][col]
    }
  }
  
  return result
}

export const reverseRows = (matrix: string[][]): string[][] => {
  const result: string[][] = []
  
  for (let row = 0; row < matrix.length; ++row) {
    result.push(matrix[row].toReversed())
  }
  
  return result
}

export const removeWhitespaceAndEmpty = (matrix: string[][]) => {
  for (const row of matrix) {
    for (let element = row.length - 1; element >= 0; --element) {
      if (isWhiteSpaceOrEmpty(row[element])) row.splice(element, 1)
    }
  }
  return matrix
}

const isWhiteSpaceOrEmpty = (str: string): boolean => {
  if (str.length === 0) return true
  if (str.trim().length === 0) return true
  return false
}

export const removeBrackets = (matrix: string[][]): string[][] => {
  for (const row of matrix) {
    for (let element = row.length - 1; element >= 0; --element) {
      row[element] = row[element].replaceAll('[', '').trim()
      row[element] = row[element].replaceAll(']', '').trim()
    }
  }
  return matrix
}

class Move {
  quantity: number
  sourceIndex: number
  destinationIndex: number

  constructor(quantity: number, source: number, dest: number) {
    this.quantity = quantity
    this.sourceIndex = source
    this.destinationIndex = dest
  }
}

const parseMove = (move: string): Move => {
  const tokens = move.split(' ')
  let command = ""
  let quantity = 0
  let source = 0
  let dest = 0
  for (const token of tokens) {
    if (token === "move" || token === "from" || token === "to") command = token
    else {
      switch (command) {
        case "move":
          quantity = parseInt(token.trim())
          break;
        case "from":
          source = parseInt(token.trim()) - 1
          break;
        case "to":
          dest = parseInt(token.trim()) - 1
          break;
      }
    }
  }
  return new Move(quantity, source, dest)
}

export const executeMoveOneCrateAtATime = (stacks: string[][], move: string) => {
  const parsedMove = parseMove(move)
  for (let i = 0; i < parsedMove.quantity; ++i) {
    const crate = stacks[parsedMove.sourceIndex].pop()
    if (crate != undefined) stacks[parsedMove.destinationIndex].push(crate)
  }
}

export const executeMoveOneStackAtAtime = (stacks: string[][], move: string) => {
  const parsedMove = parseMove(move)
  const stack = stacks[parsedMove.sourceIndex].splice(stacks[parsedMove.sourceIndex].length - parsedMove.quantity, parsedMove.quantity)
  stacks[parsedMove.destinationIndex] = stacks[parsedMove.destinationIndex].concat(stack)
}