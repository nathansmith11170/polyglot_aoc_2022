open System.Diagnostics
open System.IO
open FSharp.Item

let getPriorityOfDuplicateIn (sack: string) =
    let half = sack.Length/2
    sack.Substring(0, half).ToCharArray()
    |> Array.find (sack.Substring(half, half).Contains)
    |> matchCharacterToItem

let findPriorityOfBadgeIn (group:array<string>) =
        group[0].ToCharArray()
        |> Array.find (fun c -> group[1].Contains(c) && group[2].Contains(c))
        |> matchCharacterToItem
    
[<EntryPoint>]
let main argv =
    if argv.Length <> 1 then
        failwith $"Wrong number of arguments, got {argv.Length} but expected 1"

    if not <| File.Exists(argv[0]) then
        failwith $"The file at the provided path - {argv[0]} - does not exist"

    let timer = Stopwatch.StartNew()

    let input =
        File.ReadAllText(argv[0]).Split "\r"
        |> Array.map (fun line -> line.Trim())
        
    let sumOfDuplicates =
        input
        |> Array.map getPriorityOfDuplicateIn
        |> Array.map int
        |> Array.sum
    
    let sumOfBadges =
        input
        |> Array.splitInto (input.Length/3)
        |> Array.map findPriorityOfBadgeIn
        |> Array.map int
        |> Array.sum
        
    timer.Stop()

    printfn $"The sum of duplicated items' priorities is %d{sumOfDuplicates}"
    printfn $"The sum of badges in all groups of three is %d{sumOfBadges}"
    printfn $"Calculated in %A{timer.Elapsed.TotalMilliseconds}ms"
    0
