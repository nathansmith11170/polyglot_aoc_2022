package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"time"
)

func interpretLineAsTwoActions(line string) (int, error) {
	switch line {
	case "A X":
		return 4, nil
	case "A Y":
		return 8, nil
	case "A Z":
		return 3, nil
	case "B X":
		return 1, nil
	case "B Y":
		return 5, nil
	case "B Z":
		return 9, nil
	case "C X":
		return 7, nil
	case "C Y":
		return 2, nil
	case "C Z":
		return 6, nil
	default:
		return -1, errors.New("unrecognized line")
	}
}

func interpretLineAsActionAndOutcome(line string) (int, error) {
	switch line {
	case "A X":
		return 3, nil
	case "A Y":
		return 4, nil
	case "A Z":
		return 8, nil
	case "B X":
		return 1, nil
	case "B Y":
		return 5, nil
	case "B Z":
		return 9, nil
	case "C X":
		return 2, nil
	case "C Y":
		return 6, nil
	case "C Z":
		return 7, nil
	default:
		return -1, errors.New("unrecognized line")
	}
}

func scoreInput(scanner *bufio.Scanner) (int, int) {
	score_if_actions, score_if_action_and_outcome := 0, 0
	for scanner.Scan() {
		score, err := interpretLineAsTwoActions(scanner.Text())

		if err == nil {
			score_if_actions += score
		}

		score, err = interpretLineAsActionAndOutcome(scanner.Text())
		if err == nil {
			score_if_action_and_outcome += score
		}
	}

	return score_if_actions, score_if_action_and_outcome
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
	score_if_actions, score_if_action_and_outcome := scoreInput(scanner)

	fmt.Println("my score if the lines are actions: ", score_if_actions)
	fmt.Println("my score if the lines are action and outcome: ", score_if_action_and_outcome)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
