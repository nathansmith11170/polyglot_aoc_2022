module Tests

open FsUnit.Xunit
open Xunit
open Functions

[<Fact>]
let ``allCharsUnique returns true for string with unique characters``() =
    let result = allCharsUnique "abcde"
    result |> should equal true

[<Fact>]
let ``allCharsUnique returns false for string with repeated characters``() =
    let result = allCharsUnique "abcdea"
    result |> should equal false

[<Fact>]
let ``indexOfFirstFourUnique returns index of first four unique characters case 1``() =
    let result = indexOfFirstFourUnique "bvwbjplbgvbhsrlpgdmjqwftvncz"
    result |> should equal 5

[<Fact>]
let ``indexOfFirstFourUnique returns index of first four unique characters case 2``() =
    let result = indexOfFirstFourUnique "nppdvjthqldpwncqszvftbrmjlhg"
    result |> should equal 6

[<Fact>]
let ``indexOfFirstFourUnique returns index of first four unique characters case 3``() =
    let result = indexOfFirstFourUnique "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"
    result |> should equal 10

[<Fact>]
let ``indexOfFirstFourUnique returns index of first four unique characters case 4``() =
    let result = indexOfFirstFourUnique "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"
    result |> should equal 11
    
[<Fact>]
let ``indexOfFirstFourteenUnique returns index of first four unique characters case 1``() =
    let result = indexOfFirstFourteenUnique "mjqjpqmgbljsphdztnvjfqwrcgsmlb"
    result |> should equal 19

[<Fact>]
let ``indexOfFirstFourteenUnique returns index of first four unique characters case 2``() =
    let result = indexOfFirstFourteenUnique "bvwbjplbgvbhsrlpgdmjqwftvncz"
    result |> should equal 23

[<Fact>]
let ``indexOfFirstFourteenUnique returns index of first four unique characters case 3``() =
    let result = indexOfFirstFourteenUnique "nppdvjthqldpwncqszvftbrmjlhg"
    result |> should equal 23

[<Fact>]
let ``indexOfFirstFourteenUnique returns index of first four unique characters case 4``() =
    let result = indexOfFirstFourteenUnique "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"
    result |> should equal 29
