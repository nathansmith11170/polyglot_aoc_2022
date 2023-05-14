open System.Diagnostics
open System.IO

let setOneForDuplicateOrZeroOtherwise (line:string) =
    let assignments =
        line.Split ","
        |> Array.map (fun range -> range.Split "-")
        |> Array.map (fun range -> [int range[0] .. int range[1]])
    
    let rangeInRange range1 range2 =
        range1 |> List.forall (fun x -> List.contains x range2)
        || range2 |> List.forall (fun x -> List.contains x range1)
    
    if rangeInRange assignments[0] assignments[1] then 1 else 0
    
let setOneForOverlapOrZeroOtherwise (line:string) =
    let assignments =
        line.Split ","
        |> Array.map (fun range -> range.Split "-")
        |> Array.map (fun range -> [int range[0] .. int range[1]])
    
    let rangeInRange range1 range2 =
        range1 |> List.exists (fun x -> List.contains x range2)
        || range2 |> List.exists (fun x -> List.contains x range1)
    
    if rangeInRange assignments[0] assignments[1] then 1 else 0

[<EntryPoint>]
let main argv =
    if argv.Length <> 1 then
        failwith $"Wrong number of arguments, got {argv.Length} but expected 1"

    if not <| File.Exists(argv[0]) then
        failwith $"The file at the provided path - {argv[0]} - does not exist"

    let timer = Stopwatch.StartNew()
    let input =
        File.ReadAllText(argv[0]).Split "\r"
        |> Array.map (fun str -> str.Trim())
    let countOfLinesWithDuplicateAssignments =
        input
        |> Array.map setOneForDuplicateOrZeroOtherwise
        |> Array.sum
    let countOfLinesWithOverlapAssignments =
        input
        |> Array.map setOneForOverlapOrZeroOtherwise
        |> Array.sum
    timer.Stop()
    
    printfn $"The number of duplicate assignments is %A{countOfLinesWithDuplicateAssignments}"
    printfn $"The number of overlapping assignments is %A{countOfLinesWithOverlapAssignments}"
    printfn $"Calculated in %A{timer.Elapsed.TotalMilliseconds}ms"
    0