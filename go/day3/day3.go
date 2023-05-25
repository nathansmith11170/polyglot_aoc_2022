package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"

	"golang.org/x/exp/slices"
)

func assignPriorities(shared []rune) int {
	var sum int
	sum = 0
	alphabet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	for _, char := range shared {
		sum += strings.IndexRune(alphabet, char) + 1
	}
	return sum
}

func calculateSumOfSharedItemPriorities(scanner *bufio.Scanner) (int, int) {
	sum_of_priorities := 0
	sum_of_badges := 0
	var three_lines []string
	for scanner.Scan() {
		var shared []rune
		first_half := scanner.Text()[:len(scanner.Text())/2]
		second_half := scanner.Text()[len(scanner.Text())/2 : len(scanner.Text())]
		for _, char := range first_half {
			if strings.ContainsRune(second_half, char) && !slices.Contains(shared, char) {
				shared = append(shared, char)
			}
		}
		sum_of_priorities += assignPriorities(shared)

		three_lines = append(three_lines, scanner.Text())
		if len(three_lines) == 3 {
			var badge []rune
			for _, char := range three_lines[0] {
				if strings.ContainsRune(three_lines[1], char) && strings.ContainsRune(three_lines[2], char) {
					badge = append(badge, char)
					sum_of_badges += assignPriorities(badge)
					break
				}
			}
			three_lines = slices.Delete(three_lines, 0, len(three_lines))
		}
	}
	return sum_of_priorities, sum_of_badges
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

	sum_of_shared_item_priorities, sum_of_shared_badges := calculateSumOfSharedItemPriorities(scanner)

	fmt.Println("The sum of priorities of shared items is: ", sum_of_shared_item_priorities)
	fmt.Println("the sue of shared badges is: ", sum_of_shared_badges)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
