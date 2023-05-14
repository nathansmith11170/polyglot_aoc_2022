open System.Diagnostics
open System.IO
open Functions

[<EntryPoint>]
let main argv =
    if argv.Length <> 1 then
        failwith $"Wrong number of arguments, got {argv.Length} but expected 1"

    if not <| File.Exists(argv[0]) then
        failwith $"The file at the provided path - {argv[0]} - does not exist"
    
    let timer = Stopwatch.StartNew()
    let input = File.ReadAllText(argv[0])
    let indexOfStartSequence4 = indexOfFirstFourUnique input
    let indexOfStartSequence14 = indexOfFirstFourteenUnique input
    timer.Stop()
    
    printfn $"Index of first four unique characters in stream is %A{indexOfStartSequence4}"
    printfn $"Index of first fourteen unique characters in stream is %A{indexOfStartSequence14}"
    printfn $"Calculated in %A{timer.Elapsed.TotalMilliseconds}ms"
    0