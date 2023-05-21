const isWhiteSpaceOrEmpty = (str: string): boolean => {
  if (str.length === 0) return true
  if (str.trim().length === 0) return true
  return false
}

export const readStartingStacksIntoMatrix = (starting_stacks: string[]): string[][] => {
  const stacks: string[][] = []

  const window_size = 4
  for (let row = 0; row < starting_stacks.length; ++row) {
    let column_index = 0
    stacks[row] = []
    for (let window_start = 0; window_start < starting_stacks[row].length; window_start += window_size) {
      stacks[row].push(starting_stacks[row].substring(column_index * window_size, (column_index + 1) * window_size))
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

export const removeBrackets = (matrix: string[][]): string[][] => {
  for (const row of matrix) {
    for (let element = row.length - 1; element >= 0; --element) {
      row[element] = row[element].replaceAll('[', '').trim()
      row[element] = row[element].replaceAll(']', '').trim()
    }
  }
  return matrix
}

