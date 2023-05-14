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

function oppActionFromLine (choice: string): Action {
  let oppAction: number
  if (choice === 'A') {
    oppAction = Action.Rock
  } else if (choice === 'B') {
    oppAction = Action.Paper
  } else if (choice === 'C') {
    oppAction = Action.Scissors
  } else {
    throw Error('Invalid character for opponent action')
  }
  return oppAction
}

export function interpretLineAsTwoActions (line: string): number {
  const choices = line.split(' ')
  const oppAction = oppActionFromLine(choices[0])
  let myAction: number
  if (choices[1] === 'X') {
    myAction = Action.Rock
  } else if (choices[1] === 'Y') {
    myAction = Action.Paper
  } else if (choices[1] === 'Z') {
    myAction = Action.Scissors
  } else {
    throw Error('Invalid character for opponent action')
  }
  return resolveRound(oppAction, myAction) + myAction
}

export function interpretLineAsActionAndOutcome (line: string): number {
  const choices = line.split(' ')
  const oppAction = oppActionFromLine(choices[0])
  let outcome: number
  if (choices[1] === 'X') {
    outcome = Outcome.Loss
  } else if (choices[1] === 'Y') {
    outcome = Outcome.Draw
  } else if (choices[1] === 'Z') {
    outcome = Outcome.Win
  } else {
    throw Error('Invalid character for opponent action')
  }
  const myAction = findAction(oppAction, outcome)
  return resolveRound(oppAction, myAction) + myAction
}
