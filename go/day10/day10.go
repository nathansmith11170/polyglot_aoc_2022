package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"
)

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

	var sums []int64
	for scanner.Scan() {
		if scanner.Text() == "noop" {
			continue
		}
		tokens := strings.Split(scanner.Text(), " ")
		
	}
	
	// fmt.Printf("The number of visible trees is %d\n", visible_trees)
	// fmt.Printf("The largest scenic score for any tree is %d at (%d, %d)\n", max_scenic_score, row, col)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
