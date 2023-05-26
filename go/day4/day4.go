package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func interpretHyphenatedStringAsRange(hyphenated_range string) []int {
	strintegers := strings.Split(hyphenated_range, "-")
	range_int := make([]int, len(strintegers))
	for i, str := range strintegers {
		num, err := strconv.Atoi(str)
		if err != nil {
			fmt.Printf("Error converting string '%s' to integer %v\n", str, err)
			os.Exit(1)
		}
		range_int[i] = num
	}
	return range_int
}

func rangesFullyOverlap(line string) bool {
	hyphenated_ranges := strings.Split(line, ",")

	range_left := interpretHyphenatedStringAsRange(hyphenated_ranges[0])
	range_right := interpretHyphenatedStringAsRange(hyphenated_ranges[1])

	if range_left[0] >= range_right[0] && range_left[1] <= range_right[1] {
		return true
	}
	if range_right[0] >= range_left[0] && range_right[1] <= range_left[1] {
		return true
	}
	return false
}

func rangesPartiallyOverlap(line string) bool {
	hyphenated_ranges := strings.Split(line, ",")

	range_left := interpretHyphenatedStringAsRange(hyphenated_ranges[0])
	range_right := interpretHyphenatedStringAsRange(hyphenated_ranges[1])

	if range_left[0] >= range_right[0] && range_left[0] <= range_right[1] {
		return true
	}
	if range_right[0] >= range_left[0] && range_right[0] <= range_left[1] {
		return true
	}
	return false
}

func countOverlappingAssignments(scanner *bufio.Scanner) (int, int) {
	count_fully_overlapping, count_partially_overlapping := 0, 0
	for scanner.Scan() {
		if rangesFullyOverlap(scanner.Text()) {
			count_fully_overlapping++
		}
		if rangesPartiallyOverlap(scanner.Text()) {
			count_partially_overlapping++
		}
	}
	return count_fully_overlapping, count_partially_overlapping
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

	count_fully_overlapping, count_partially_overlapping := countOverlappingAssignments(scanner)

	fmt.Println("The number of assignments that fully overlap is: ", count_fully_overlapping)
	fmt.Println("the number of assignments that partially overlap is: ", count_partially_overlapping)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
