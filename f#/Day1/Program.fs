open System
open System.Diagnostics
open System.IO

let sumStrings (stringNumbers: string) =
    stringNumbers.Split("\n", StringSplitOptions.RemoveEmptyEntries)
    |> Array.map int
    |> Array.sum

[<EntryPoint>]
let main argv =
    if argv.Length <> 1 then
        failwith $"Wrong number of arguments, got {argv.Length} but expected 1"
    if not <| File.Exists(argv[0]) then
        failwith $"The file at {argv[0]} does not exist"
        
    let timer = Stopwatch.StartNew()
    let calorieCounts =
        File.ReadAllText(argv[0]).Split "\n\n"
        |> Array.map sumStrings
        |> Array.sortDescending
    timer.Stop()
    
    printfn $"Highest: %d{calorieCounts[0]}"
    Array.sum calorieCounts[0..2] |> printfn "Top Three: %d"
    printfn $"Completed in {timer.Elapsed.TotalMilliseconds}ms"
        
    0