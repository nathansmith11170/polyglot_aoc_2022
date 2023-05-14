open System.Diagnostics
open System.IO

type Play =
    | Rock = 1
    | Paper = 2
    | Scissors = 3
    
type Outcome =
    | Loss = 0
    | Draw = 3
    | Win = 6
    
let scoreRoundFromPlays enemyPlay myPlay =
    let scoreRound outcome= int myPlay + int outcome
    
    let resolveRound =
        let outcomeOfRockVersusMyPlay =
            match myPlay with
            | Play.Rock -> Outcome.Draw
            | Play.Paper -> Outcome.Win
            | Play.Scissors -> Outcome.Loss
            | _ -> raise <| System.ArgumentOutOfRangeException("Unrecognized play.")
        
        let outcomeOfPaperVersusMyPlay =
            match myPlay with
            | Play.Rock -> Outcome.Loss
            | Play.Paper -> Outcome.Draw
            | Play.Scissors -> Outcome.Win
            | _ -> raise <| System.ArgumentOutOfRangeException("Unrecognized play.")
            
        let outcomeOfScissorsVersusMyPlay =
            match myPlay with
            | Play.Rock -> Outcome.Win
            | Play.Paper -> Outcome.Loss
            | Play.Scissors -> Outcome.Draw
            | _ -> raise <| System.ArgumentOutOfRangeException("Unrecognized play.")
        
        match enemyPlay with
        | Play.Rock -> outcomeOfRockVersusMyPlay
        | Play.Paper -> outcomeOfPaperVersusMyPlay
        | Play.Scissors -> outcomeOfScissorsVersusMyPlay
        | _ -> raise <| System.ArgumentOutOfRangeException("Unrecognized play.")
            
    resolveRound |> scoreRound
    
let evaluateLineAsIfSecondCharacterIsMyPlay (line: string) =
    let choices = line.Split [| ' ' |]
    
    let enemyPlay =
        match choices[0] with
        | "A" -> Play.Rock
        | "B" -> Play.Paper
        | "C" -> Play.Scissors
        | _ -> failwith "Unrecognized character"
        
    let myPlay =
        match choices[1] with
        | "X" -> Play.Rock
        | "Y" -> Play.Paper
        | "Z" -> Play.Scissors
        | _ -> failwith "Unrecognized character"
        
    scoreRoundFromPlays enemyPlay myPlay
    
let evaluateLineAsifSecondCharacterIsOutcome (line:string) =
    let choices = line.Split [| ' ' |]
    
    let enemyPlay =
        match choices[0] with
        | "A" -> Play.Rock
        | "B" -> Play.Paper
        | "C" -> Play.Scissors
        | _ -> failwith "Unrecognized character"
   
    let desiredOutcome =
        match choices[1] with
        | "X" -> Outcome.Loss
        | "Y" -> Outcome.Draw
        | "Z" -> Outcome.Win
        | _ -> failwith "Unrecognized character"
        
    let determineMyPlayGivenPlayAndOutcome =
        let winningPlay =
            match enemyPlay with
            | Play.Rock -> Play.Paper
            | Play.Paper -> Play.Scissors
            | Play.Scissors -> Play.Rock
            | _ -> failwith "Invalid play"
            
        let losingPlay =
            match enemyPlay with
            | Play.Rock -> Play.Scissors
            | Play.Paper -> Play.Rock
            | Play.Scissors -> Play.Paper
            | _ -> failwith "Invalid play"
        
        match desiredOutcome with
        | Outcome.Loss -> losingPlay
        | Outcome.Draw -> enemyPlay
        | Outcome.Win -> winningPlay
        | _ -> failwith "Invalid outcome"
    
    determineMyPlayGivenPlayAndOutcome |> scoreRoundFromPlays enemyPlay
    
[<EntryPoint>]
let main argv =
    if argv.Length <> 1 then
        failwith $"Wrong number of arguments provided, got {argv.Length} but expected 1"
    
    if not <| File.Exists(argv[0]) then
        failwith $"The file at provided path {argv[0]} does not exist."
        
    let timer = Stopwatch.StartNew()
    let input = File.ReadAllText(argv[0]).Split "\n" |> Array.map (fun str -> str.Trim())
    
    let scoreIfPlay = input |> Array.map evaluateLineAsIfSecondCharacterIsMyPlay |> Array.sum
    
    let scoreIfOutcome = input |> Array.map evaluateLineAsifSecondCharacterIsOutcome |> Array.sum
    
    timer.Stop()
    printfn $"Score: %d{scoreIfPlay} if the second character is my play."
    printfn $"Score: %d{scoreIfOutcome} if the second character is desired outcome."
    printfn $"Calculated in %A{timer.Elapsed.TotalMilliseconds}ms"
    
    0
    