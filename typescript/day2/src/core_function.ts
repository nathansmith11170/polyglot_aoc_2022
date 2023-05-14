export function startStopwatch (): () => number {
  const startTime = performance.now()
  return () => performance.now() - startTime
}

function resolveRound (oppAction: number, myAction: number): number {
  switch (oppAction) {
    case 1:
      switch (myAction) {
        case 1: return 3
        case 2: return 6
        case 3: return 0
        default: throw Error(`Unrecognized Action ${myAction}`)
      }
    case 2:
      switch (myAction) {
        case 1: return 0
        case 2: return 3
        case 3: return 6
        default: throw Error(`Unrecognized Action ${myAction}`)
      }
    case 3:
      switch (myAction) {
        case 1: return 6
        case 2: return 0
        case 3: return 3
        default: throw Error(`Unrecognized Action ${myAction}`)
      }
    default: throw Error(`Unrecognized Action ${oppAction}`)
  }
}

function findAction (action: number, outcome: number): number {
  switch (action) {
    case 1:
      switch (outcome) {
        case 0: return 3
        case 3: return 1
        case 6: return 2
        default: throw Error(`Unrecognized Outcome ${outcome}`)
      }
    case 2:
      switch (outcome) {
        case 0: return 1
        case 3: return 2
        case 6: return 3
        default: throw Error(`Unrecognized Outcome ${outcome}`)
      }
    case 3:
      switch (outcome) {
        case 0: return 2
        case 3: return 3
        case 6: return 1
        default: throw Error(`Unrecognized Outcome ${outcome}`)
      }
    default: throw Error(`Unrecognized Action ${action}`)
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
