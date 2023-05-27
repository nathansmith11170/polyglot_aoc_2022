package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func reverse[T any](slice []T) []T {
	reversed := make([]T, len(slice))
	for i, j := 0, len(slice)-1; i < len(slice); i, j = i+1, j-1 {
		reversed[i] = slice[j]
	}
	return reversed
}

func readStacks(scanner *bufio.Scanner) [][]string {
	var builder strings.Builder
	for scanner.Scan() {
		if strings.Trim(scanner.Text(), " \n\r\t") == "" {
			break
		}

		builder.WriteString(scanner.Text())
		builder.WriteString("\n")
	}

	stacks_text := strings.Split(builder.String(), "\n")
	filtered := make([]string, 0, len(stacks_text))
	for _, s := range stacks_text {
		if s != "" {
			filtered = append(filtered, s)
		}
	}
	stacks_text = filtered

	stack := make([][]string, 0)
	window_size := 4
	for i, line := range stacks_text {
		stack = append(stack, make([]string, 0))

		for j := 0; j <= len(line); j += window_size {
			stack[i] = append(stack[i], line[j:j+window_size-1])
		}
	}

	cols := len(stack)
	rows := len(stack[0])

	transposed_stack := make([][]string, cols)
	for i := range transposed_stack {
		transposed_stack[i] = make([]string, rows)
	}

	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			transposed_stack[j][i] = stack[i][j]
		}
	}

	for i, row := range transposed_stack {
		transposed_stack[i] = reverse(row)
	}

	for i, row := range transposed_stack {
		filtered = make([]string, 0, len(row))
		for _, str := range row {
			str = strings.ReplaceAll(str, "[", "")
			str = strings.ReplaceAll(str, "]", "")
			str = strings.ReplaceAll(str, " ", "")
			if strings.TrimSpace(str) != "" {
				filtered = append(filtered, str)
			}
		}
		transposed_stack[i] = filtered
	}

	return transposed_stack
}

func performMove9000(stack [][]string, quantity int, source int, dest int) [][]string {
	for i := 0; i < quantity; i++ {
		item := stack[source][len(stack[source])-1]
		stack[dest] = append(stack[dest], item)
		stack[source] = stack[source][:len(stack[source])-1]
	}
	return stack
}

func performMove9001(stack [][]string, quantity int, source int, dest int) [][]string {
	slice := stack[source][len(stack[source])-quantity : len(stack[source])]
	stack[dest] = append(stack[dest], slice...)
	stack[source] = stack[source][:len(stack[source])-quantity]
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

	stack := readStacks(scanner)
	top_of_stack_9000, top_of_stack_9001 := performMoves(stack, scanner)

	fmt.Println("The top of the stack after the mover 9000 is: ", top_of_stack_9000)
	fmt.Println("The top of the stack after the mover 9001 is: ", top_of_stack_9001)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
