package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"time"

	"golang.org/x/exp/slices"
)

func allRunesUniqueIn(slice string) bool {
	runes := make([]rune, 0, len(slice))
	for _, c := range slice {
		if slices.Contains(runes, c) {
			return false
		} else {
			runes = append(runes, c)
		}
	}
	return true
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
	var contents_builder strings.Builder
	for scanner.Scan() {
		contents_builder.WriteString(scanner.Text())
	}
	contents_string := contents_builder.String()

	var runes_before_first_packet int
	window_size := 4
	for i := 0; i < len(contents_string)-window_size; i++ {
		slice := contents_string[i : i+window_size]
		if allRunesUniqueIn(slice) {
			runes_before_first_packet = i + window_size
			break
		}
	}
	var runes_before_first_message int
	window_size = 14
	for i := 0; i < len(contents_string)-window_size; i++ {
		slice := contents_string[i : i+window_size]
		if allRunesUniqueIn(slice) {
			runes_before_first_message = i + window_size
			break
		}
	}
	fmt.Printf("Characters received before first packet: %d\n", runes_before_first_packet)
	fmt.Printf("Characters received before first message: %d\n", runes_before_first_message)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
