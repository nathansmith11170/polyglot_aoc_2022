package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"time"
)

func scenicScore(matrix [][]int, row int, col int) int {
	north, east, south, west := 0, 0, 0, 0

	for i := col - 1; i >= 0; i-- {
		west++
		if matrix[row][i] >= matrix[row][col] {
			break
		}
	}

	for i := col + 1; i < len(matrix[row]); i++ {
		east++
		if matrix[row][i] >= matrix[row][col] {
			break
		}
	}

	for j := row - 1; j >= 0; j-- {
		north++
		if matrix[j][col] >= matrix[row][col] {
			break
		}
	}

	for j := row + 1; j < len(matrix); j++ {
		south++
		if matrix[j][col] >= matrix[row][col] {
			break
		}
	}

	return north * east * south * west
}

func getMaxScenicScore(matrix [][]int) (int, int, int) {
	max := 0
	row := 0
	col := 0

	for i := 0; i < len(matrix); i++ {
		for j := 0; j < len(matrix[i])-1; j++ {
			score := scenicScore(matrix, i, j)
			if score > max {
				max = score
				row = i
				col = j
			}
		}
	}

	return max, row, col
}

func isVisible(matrix [][]int, row int, col int) bool {
	north, east, south, west := true, true, true, true

	for i := 0; i < col; i++ {
		if matrix[row][i] >= matrix[row][col] {
			west = false
		}
	}

	for i := len(matrix[row]) - 1; i > col; i-- {
		if matrix[row][i] >= matrix[row][col] {
			east = false
		}
	}

	for j := 0; j < row; j++ {
		if matrix[j][col] >= matrix[row][col] {
			north = false
		}
	}

	for j := len(matrix) - 1; j > row; j-- {
		if matrix[j][col] >= matrix[row][col] {
			south = false
		}
	}

	return north || east || south || west
}

func countVisibleTrees(matrix [][]int) int {
	count := 0

	for i := 0; i < len(matrix); i++ {
		for j := 0; j < len(matrix); j++ {
			if isVisible(matrix, i, j) {
				count++
			}
		}
	}

	return count
}

func main() {
	if len(os.Args) != 2 {
		fmt.Println("Wrong number of arguments, expected filename.")
		os.Exit(1)
	}

	input_file, err := os.Open(os.Args[1])
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer input_file.Close()

	start := time.Now()
	scanner := bufio.NewScanner(input_file)

	matrix := make([][]int, 0, 1)

	for scanner.Scan() {
		matrix = append(matrix, make([]int, 0, 1))

		for _, char := range scanner.Text() {
			num, err := strconv.ParseUint(string(char), 10, 64)

			if err != nil {
				fmt.Printf("Cannot parse input, non-numeric character encountered.")
				os.Exit(1)
			}

			matrix[len(matrix)-1] = append(matrix[len(matrix)-1], int(num))
		}
	}

	visible_trees := countVisibleTrees(matrix)

	max_scenic_score, row, col := getMaxScenicScore(matrix)

	fmt.Printf("The number of visible trees is %d\n", visible_trees)
	fmt.Printf("The largest scenic score for any tree is %d at (%d, %d)\n", max_scenic_score, row, col)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
