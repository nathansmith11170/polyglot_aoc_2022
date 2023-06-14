export const move = (rope: number[][], tail_visited: number[][], direction: string, steps: number) => {
  for (let i = 0; i < steps; i++) {
    switch (direction) {
      case 'U':
        rope[0][1] = rope[0][1] + 1
        break
      case 'R':
        rope[0][0] = rope[0][0] + 1
        break
      case 'D':
        rope[0][1] = rope[0][1] - 1
        break
      case 'L':
        rope[0][0] = rope[0][0] - 1
        break
    }

    for (let i = 1; i < rope.length; i++) {
      move_tail(rope[i - 1], rope[i])
    }

    if (!tail_visited.some((p) => p[0] === rope[rope.length - 1][0] && p[1] === rope[rope.length - 1][1])) {
      tail_visited.push([rope[rope.length - 1][0], rope[rope.length - 1][1]])
    }
  }
}

const move_tail = (head: number[], tail: number[]) => {
  const diff = [head[0] - tail[0], head[1] - tail[1]]

  if (diff[0] === 0 && diff[1] === 2) {
    tail[1] = tail[1] + 1
  }
  if (diff[0] === 1 && diff[1] === 2) {
    tail[0] = tail[0] + 1
    tail[1] = tail[1] + 1
  }
  if (diff[0] === 2 && diff[1] === 1) {
    tail[0] = tail[0] + 1
    tail[1] = tail[1] + 1
  }
  if (diff[0] === 2 && diff[1] === 0) {
    tail[0] = tail[0] + 1
  }
  if (diff[0] === 2 && diff[1] === -1) {
    tail[0] = tail[0] + 1
    tail[1] = tail[1] - 1
  }
  if (diff[0] === 1 && diff[1] === -2) {
    tail[0] = tail[0] + 1
    tail[1] = tail[1] - 1
  }
  if (diff[0] === 0 && diff[1] === -2) {
    tail[1] = tail[1] - 1
  }
  if (diff[0] === -1 && diff[1] === -2) {
    tail[0] = tail[0] - 1
    tail[1] = tail[1] - 1
  }
  if (diff[0] === -2 && diff[1] === -1) {
    tail[0] = tail[0] - 1
    tail[1] = tail[1] - 1
  }
  if (diff[0] === -2 && diff[1] == 0) {
    tail[0] = tail[0] - 1
  }
  if (diff[0] === -2 && diff[1] === 1) {
    tail[0] = tail[0] - 1
    tail[1] = tail[1] + 1
  }
  if (diff[0] === -1 && diff[1] === 2) {
    tail[0] = tail[0] - 1
    tail[1] = tail[1] + 1
  }

  if (diff[0] === -2 && diff[1] === 2) {
    tail[0] = tail[0] - 1
    tail[1] = tail[1] + 1
  }
  if (diff[0] === -2 && diff[1] === -2) {
    tail[0] = tail[0] - 1
    tail[1] = tail[1] - 1
  }
  if (diff[0] === 2 && diff[1] === -2) {
    tail[0] = tail[0] + 1
    tail[1] = tail[1] - 1
  }
  if (diff[0] === 2 && diff[1] === 2) {
    tail[0] = tail[0] + 1
    tail[1] = tail[1] + 1
  }
}
