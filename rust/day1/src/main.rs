use std::env;
use std::fs;
use std::time::SystemTime;

fn sum_strings(lines: &str) -> i64 {
    lines.split("\n")
        .filter(|s| !str::is_empty(s))
        .filter(|s| s.trim().is_empty())
        .map(|s| s.parse::<i64>().expect("Error parsing {str}"))
        .sum()
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

    let mut inventories: Vec<i64> = lines.split("\n\n")
        .map(sum_strings)
        .collect::<Vec<i64>>();
    inventories.sort();
    inventories.reverse();
    println!("The largest inventory is: {0}", inventories[0]);
    println!("The sum of top three is: {0}", inventories[0..3].iter().sum::<i64>());
    match now.elapsed() {
        Ok(elapsed) => println!("Time elapsed: {:.5} microseconds", (elapsed.as_micros())),
        Err(e) => panic!("Some error occurred: {}", e)
    }
}
