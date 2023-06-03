export const countVisibleTrees = (matrix: number[][]): number => {
	let sum = 0

	matrix.forEach((row, r_index) => {
		row.forEach((_, c_index) => {
			if (isVisible(matrix, r_index, c_index)) {
				sum++
			}
		})
	})
	
	return sum
}

export const getMaxScenicScore = (matrix: number[][]): number => {
	let max = 0

	matrix.forEach((row, r_index) => {
		row.forEach((_, c_index) => {
			const score = scenicScore(matrix, r_index, c_index)
			if (score > max) {
				max = score
			}
		})
	})

	return max
}

const isVisible = (matrix: number[][], row: number, col: number): boolean => {
	let north = true
	let east = true
	let south = true
	let west = true

	for (let i = 0; i < col; i++) {
		if (matrix[row][i] >= matrix[row][col]) {
			west = false
			break
		}
	}

	for (let i = matrix[row].length - 1; i > col; i--) {
		if (matrix[row][i] >= matrix[row][col]) {
			east = false
			break
		}
	}

	for (let j = 0; j < row; j++) {
		if (matrix[j][col] >= matrix[row][col]) {
			north = false
			break
		}
	}

	for (let j = matrix.length - 1; j > row; j--) {
		if (matrix[j][col] >= matrix[row][col]) {
			south = false
			break
		}
	}

	return north || east || south || west	
}

const scenicScore = (matrix: number[][], row: number, col: number): number => {
	let north = 0
	let east = 0
	let south = 0
	let west = 0

	for (let i = col - 1; i >= 0; i--) {
		west++
		if (matrix[row][i] >= matrix[row][col]) {
			break
		}
	}
	
	for (let i = col + 1; i < matrix[row].length; i++) {
		east++
		if (matrix[row][i] >= matrix[row][col]) {
			break
		}
	}

	for (let j = row - 1; j >= 0; j--) {
		north++
		if (matrix[j][col] >= matrix[row][col]) {
			break
		}
	}

	for (let j = row + 1; j < matrix.length; j++) {
		south++
		if (matrix[j][col] >= matrix[row][col]) {
			break
		}
	}

	return north * east * south * west
}
