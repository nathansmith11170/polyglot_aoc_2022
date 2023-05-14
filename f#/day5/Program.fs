open System.Diagnostics
open System.IO

type Move =
    { Quantity: int
      Source: int
      Destination: int }

let removeHead index list move =
    if index = move.Source then
        List.skip move.Quantity list
    else
        list

let applyMoves f (stacks:string list list) moves =
    let parseMove (move:string) =
        let actionArray =
            move.Split " "
            |> Array.map (fun str -> str |> String.filter System.Char.IsDigit)
            |> Array.filter (fun str -> not <| System.String.IsNullOrWhiteSpace str)
            |> Array.map int

        { Quantity = actionArray[0]
          Source = actionArray[1] - 1
          Destination = actionArray[2] - 1 }
        
    moves |> List.fold (fun stacks move -> f stacks (parseMove move)) stacks

let getTopCrates (stacks: string list list) =
    [ for row in stacks do
          yield row.Head ]
    |> String.concat ""

let applyMoves9000 moves startingStacks =
    let move9000 index list move (stacks:string list list) =
        if index = move.Destination then
            (List.rev (List.truncate move.Quantity stacks[move.Source])) @ list
        else
            list
    
    let moveCrates stacks move =
        stacks
        |> List.mapi (fun i list -> removeHead i list move)
        |> List.mapi (fun i list -> move9000 i list move stacks)

    moves |> applyMoves moveCrates startingStacks |> getTopCrates

let applyMoves9001 moves (startingStacks:string list list) =
    let move9001 index list move (stacks:string list list) =
        if index = move.Destination then
            (List.truncate move.Quantity stacks[move.Source]) @ list
        else
            list
            
    let moveCrates stacks move =
        stacks
        |> List.mapi (fun i list -> removeHead i list move)
        |> List.mapi (fun i list -> move9001 i list move stacks)

    moves |> applyMoves moveCrates startingStacks |> getTopCrates

[<EntryPoint>]
let main argv =
    if argv.Length <> 1 then
        failwith $"Wrong number of arguments, got {argv.Length} but expected 1"

    if not <| File.Exists(argv[0]) then
        failwith $"The file at the provided path - {argv[0]} - does not exist"


    let timer = Stopwatch.StartNew()

    let startCondition, moves =
        let lines = File.ReadAllLines(argv[0])
        lines |> Array.splitAt (Array.findIndex (fun line -> line.Equals "") lines)

    let moves =
        moves
        |> Array.toList
        |> List.filter (fun str -> not <| System.String.IsNullOrWhiteSpace str)

    let startingStacks =
        startCondition
        |> Array.toList
        |> List.map (fun str ->
            let characters = str.Length + 1
            let columns = int (float characters / 4.0)
            str |> Seq.splitInto columns |> Seq.map System.String |> Seq.toList)
        |> List.transpose
        |> List.map (fun list -> list |> List.removeAt (list.Length - 1))
        |> List.map (List.filter (fun str -> not <| System.String.IsNullOrWhiteSpace str))
        |> List.map (List.map (String.filter System.Char.IsLetter))


    let endingStacks9000 = startingStacks |> applyMoves9000 moves
    let endingStacks9001 = startingStacks |> applyMoves9001 moves
    timer.Stop()

    printfn $"The top of each stack for the mover 9000 is %A{endingStacks9000}"
    printfn $"The top of each stack for the mover 9001 is %A{endingStacks9001}"
    printfn $"Calculated in %A{timer.Elapsed.TotalMilliseconds}ms"
    0

// Answer to part 1 FZCMJCRHZ
// Answer to part 2 JSDHQMZGF
