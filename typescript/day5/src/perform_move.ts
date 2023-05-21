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