module Functions

let allCharsUnique str =
    (str |> Seq.distinct |> Seq.length) = (str |> Seq.length)

let indexOfFirstFourUnique (str:string) =
    let mutable index = 0
    str
    |> Seq.windowed 4 
    |> Seq.findIndex allCharsUnique
    |> (fun x -> x + 4)

let indexOfFirstFourteenUnique (str:string) =
    let mutable index = 0
    str
    |> Seq.windowed 14 
    |> Seq.findIndex allCharsUnique
    |> (fun x -> x + 14)
