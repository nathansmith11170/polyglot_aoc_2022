use std::env;
use std::fs;
use std::time::SystemTime;

fn interpret_line_as_two_actions(line: &str) -> i64 {
    return match line
    {
        "A X" => 4, // rock v rock is draw (3) and Rock is worth 1
        "A Y" => 8, // rock v paper is win (6) and paper is worth 2
        "A Z" => 3, // rock v scissors is loss (0) and scissors is worth 3
        "B X" => 1, // paper v rock is loss
        "B Y" => 5, // paper v paper is draw
        "B Z" => 9, // paper v scissors is win
        "C X" => 7, // scissors v rock is win
        "C Y" => 2, // scissors v paper is loss
        "C Z" => 6, // scissors v scissors is draw
        _ => panic!("Unexpected line in file: {line}")
    }
}
fn interpret_line_as_action_and_outcome(line: &str) -> i64 {
    return match line
    {
        "A X" => 3, // rock and loss is 0 and losing play is scissors worth 3
        "A Y" => 4, // rock and draw is 3 and drawing play is rock worth 1
        "A Z" => 8, // rock and win is 6 and winning play is paper worth 2
        "B X" => 1, // paper and loss
        "B Y" => 5, // paper and draw
        "B Z" => 9, // paper and win
        "C X" => 2, // scissors and loss
        "C Y" => 6, // scissors and draw
        "C Z" => 7, // scissors and win
        _ => panic!("Unexpected line in file: {line}")
    }
}

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 {
        panic!("Expected 1 argument, received {0}", args.len());
    }

    let now = SystemTime::now();
    let read_attempt = fs::read_to_string(&args[1]);
    let lines = match read_attempt {
        Ok(content) => content,
        Err(_) => panic!("Could not read the file at {0}", args[1])
    };

    let score_if_lines_are_action: i64 = lines.split("\n")
        .filter(| line | !line.is_empty())
        .map(interpret_line_as_two_actions)
        .sum();
    let score_if_lines_are_action_and_outcome:  i64 = lines.split("\n")
        .filter(| line | !line.is_empty())
        .map(interpret_line_as_action_and_outcome)
        .sum();

    println!("Score if lines are actions: {score_if_lines_are_action}");
    println!("Score if lines are action and outcome: {score_if_lines_are_action_and_outcome}");
    match now.elapsed() {
        Ok(elapsed) => {
            let duration_millis = (elapsed.as_nanos() as f64) / 1000000.0;
            println!("Time elapsed: {duration_millis}ms")
        },
        Err(e) => panic!("Error measuring time: {e}")
    }
}
