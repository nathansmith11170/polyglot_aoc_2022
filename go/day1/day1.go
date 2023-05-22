package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"time"
)

func getMaxCalories(scanner *bufio.Scanner) (int64, int64, int64) {
	var (
		max        int64
		secondMost int64
		thirdMost  int64
		sum        int64
	)
	max, secondMost, thirdMost, sum = 0, 0, 0, 0
	for scanner.Scan() {
		number, err := strconv.ParseInt(scanner.Text(), 10, 64)
		if err != nil {
			if max < sum {
				thirdMost = secondMost
				secondMost = max
				max = sum
			} else if secondMost < sum {
				thirdMost = secondMost
				secondMost = sum
			} else if thirdMost < sum {
				thirdMost = sum
			}
			sum = 0
			continue
		}
		sum += number
	}

	return max, secondMost, thirdMost
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
	maxCalories, secondMost, thirdMost := getMaxCalories(scanner)

	fmt.Println("The elf carrying the most calories has: ", maxCalories)
	fmt.Println("The elves carrying the top 3 calories have: ", maxCalories+secondMost+thirdMost)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
