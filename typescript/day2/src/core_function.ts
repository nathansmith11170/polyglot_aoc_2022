export function startStopwatch (): () => number {
  const startTime = performance.now()
  return () => performance.now() - startTime
}

enum Action {
  Rock = 1,
  Paper = 2,
  Scissors = 3
}

enum Outcome {
  Loss = 0,
  Draw = 3,
  Win = 6
}

function resolveRound (oppAction: Action, myAction: Action): Outcome {
  switch (oppAction) {
    case Action.Rock:
      switch (myAction) {
        case Action.Rock: return Outcome.Draw
        case Action.Paper: return Outcome.Win
        case Action.Scissors: return Outcome.Loss
        default: throw Error(`Invalid Action enumeration value: ${myAction as number}`)
      }
    case Action.Paper:
      switch (myAction) {
        case Action.Rock: return Outcome.Loss
        case Action.Paper: return Outcome.Draw
        case Action.Scissors: return Outcome.Win
        default: throw Error(`Invalid Action enumeration value: ${myAction as number}`)
      }
    case 3:
      switch (myAction) {
        case Action.Rock: return Outcome.Win
        case Action.Paper: return Outcome.Loss
        case Action.Scissors: return Outcome.Draw
        default: throw Error(`Invalid Action enumeration value: ${myAction as number}`)
      }
    default: throw Error(`Invalid Action enumeration value: ${oppAction as number}`)
  }
}

function findAction (action: Action, outcome: Outcome): Action {
  switch (action) {
    case Action.Rock:
      switch (outcome) {
        case Outcome.Loss: return Action.Scissors
        case Outcome.Draw: return Action.Rock
        case Outcome.Win: return Action.Paper
        default: throw Error(`Unrecognized Outcome enumeration value: ${outcome as number}`)
      }
    case Action.Paper:
      switch (outcome) {
        case Outcome.Loss: return Action.Rock
        case Outcome.Draw: return Action.Paper
        case Outcome.Win: return Action.Scissors
        default: throw Error(`Unrecognized Outcome enumeration value: ${outcome as number}`)
      }
    case Action.Scissors:
      switch (outcome) {
        case Outcome.Loss: return Action.Paper
        case Outcome.Draw: return Action.Scissors
        case Outcome.Win: return Action.Rock
        default: throw Error(`Unrecognized Outcome enumeration value: ${outcome as number}`)
      }
    default: throw Error(`Unrecognized Action enumeration value: ${action as number}`)
  }
}

export function interpretLineAsTwoActions (line: string): number {
  const choices = line.split(' ')
  let oppAction: number
  if (choices[0] === 'A') {
    oppAction = 1
  } else if (choices[0] === 'B') {
    oppAction = 2
  } else if (choices[0] === 'C') {
    oppAction = 3
  } else {
    throw Error('Invalid character for opponent action')
  }
  let myAction: number
  if (choices[1] === 'X') {
    myAction = 1
  } else if (choices[1] === 'Y') {
    myAction = 2
  } else if (choices[1] === 'Z') {
    myAction = 3
  } else {
    throw Error('Invalid character for opponent action')
  }
  return resolveRound(oppAction, myAction) + myAction
}

export function interpretLineAsActionAndOutcome (line: string): number {
  const choices = line.split(' ')
  let oppAction: number
  if (choices[0] === 'A') {
    oppAction = 1
  } else if (choices[0] === 'B') {
    oppAction = 2
  } else if (choices[0] === 'C') {
    oppAction = 3
  } else {
    throw Error('Invalid character for opponent action')
  }
  let outcome: number
  if (choices[1] === 'X') {
    outcome = 0
  } else if (choices[1] === 'Y') {
    outcome = 3
  } else if (choices[1] === 'Z') {
    outcome = 6
  } else {
    throw Error('Invalid character for opponent action')
  }
  const myAction = findAction(oppAction, outcome)
  return resolveRound(oppAction, myAction) + myAction
}
