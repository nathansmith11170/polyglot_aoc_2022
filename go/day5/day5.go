package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func performMove9001(stack [][]string, quantity int, source int, dest int) [][]string {
	slice := stack[source][len(stack[source])-quantity : len(stack[source])]
	stack[dest] = append(stack[dest], slice...)
	stack[source] = stack[source][:len(stack[source])-quantity]
	return stack
}

func performMove9000(stack [][]string, quantity int, source int, dest int) [][]string {
	for i := 0; i < quantity; i++ {
		item := stack[source][len(stack[source])-1]
		stack[dest] = append(stack[dest], item)
		stack[source] = stack[source][:len(stack[source])-1]
	}
	return stack
}

func performMoves(stack [][]string, scanner *bufio.Scanner) (string, string) {
	stack_9000 := make([][]string, len(stack))
	stack_9001 := make([][]string, len(stack))
	for i, row := range stack {
		stack_9000[i] = make([]string, len(row))
		stack_9001[i] = make([]string, len(row))
		copy(stack_9000[i], row)
		copy(stack_9001[i], row)
	}

	for scanner.Scan() {
		order := strings.Split(scanner.Text(), " ")
		var command string
		var quantity int
		var source int
		var dest int
		for _, str := range order {
			num, err := strconv.Atoi(str)

			if err != nil {
				command = str
			} else {
				switch command {
				case "move":
					quantity = num
				case "from":
					source = num - 1
				case "to":
					dest = num - 1
				}
			}
		}

		stack_9000 = performMove9000(stack_9000, quantity, source, dest)
		stack_9001 = performMove9001(stack_9001, quantity, source, dest)
	}

	var top_of_stack_9000 strings.Builder
	var top_of_stack_9001 strings.Builder
	for i := range stack_9000 {
		top_of_stack_9001.WriteString(stack_9001[i][len(stack_9001[i])-1])
		top_of_stack_9000.WriteString(stack_9000[i][len(stack_9000[i])-1])
	}
	return top_of_stack_9000.String(), top_of_stack_9001.String()
}

func removeNonAlpha(matrix [][]string) [][]string {
	filtered_matrix := make([][]string, 0, len(matrix))
	for i, row := range matrix {
		filtered_matrix = append(filtered_matrix, make([]string, 0, len(row)))
		for _, str := range row {
			str = strings.ReplaceAll(str, "[", "")
			str = strings.ReplaceAll(str, "]", "")
			str = strings.ReplaceAll(str, " ", "")
			if strings.TrimSpace(str) != "" {
				filtered_matrix[i] = append(filtered_matrix[i], str)
			}
		}
	}
	return filtered_matrix
}

func reverse[T any](slice []T) []T {
	reversed := make([]T, len(slice))
	for i, j := 0, len(slice)-1; i < len(slice); i, j = i+1, j-1 {
		reversed[i] = slice[j]
	}
	return reversed
}

func reverseRows(matrix [][]string) [][]string {
	for i, row := range matrix {
		matrix[i] = reverse(row)
	}
	return matrix
}

func transposeStringMatrix(matrix [][]string) [][]string {
	cols := len(matrix)
	rows := len(matrix[0])

	transposed_stack := make([][]string, cols)
	for i := range transposed_stack {
		transposed_stack[i] = make([]string, rows)
	}

	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			transposed_stack[j][i] = matrix[i][j]
		}
	}
	return transposed_stack
}

func parseLinesToArrays(lines []string) [][]string {
	stacks := make([][]string, 0)
	window_size := 4
	for i, line := range lines {
		stacks = append(stacks, make([]string, 0))

		for j := 0; j <= len(line); j += window_size {
			stacks[i] = append(stacks[i], line[j:j+window_size-1])
		}
	}
	return stacks
}

func filterNonEmpty(lines []string) []string {
	filtered := make([]string, 0, len(lines))
	for _, s := range lines {
		if s != "" {
			filtered = append(filtered, s)
		}
	}
	return filtered
}

func parseStacks(stacks string) [][]string {
	stacks_by_line := strings.Split(stacks, "\n")
	stacks_by_line = filterNonEmpty(stacks_by_line)
	stacks_matrix := parseLinesToArrays(stacks_by_line)
	stacks_matrix = transposeStringMatrix(stacks_matrix)
	stacks_matrix = reverseRows(stacks_matrix)
	stacks_matrix = removeNonAlpha(stacks_matrix)
	return stacks_matrix
}

func readStacks(scanner *bufio.Scanner) string {
	var builder strings.Builder
	for scanner.Scan() {
		if strings.Trim(scanner.Text(), " \n\r\t") == "" {
			break
		}

		builder.WriteString(scanner.Text())
		builder.WriteString("\n")
	}
	return builder.String()
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

	stacks_string := readStacks(scanner)

	stack := parseStacks(stacks_string)
	top_of_stack_9000, top_of_stack_9001 := performMoves(stack, scanner)

	fmt.Println("The top of the stack after the mover 9000 is: ", top_of_stack_9000)
	fmt.Println("The top of the stack after the mover 9001 is: ", top_of_stack_9001)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
