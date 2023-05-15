using System.Diagnostics;

public static class Program {
    
    private static int InterpretLineAsActions(string line)
    {
        switch (line)
        {
            case "A X": return 4;
            case "A Y": return 8;
            case "A Z": return 3;
            case "B X": return 1;
            case "B Y": return 5;
            case "B Z": return 9;
            case "C X": return 7;
            case "C Y": return 2;
            case "C Z": return 6;
            default: throw new Exception($"Unrecognized line {line}");
        }
    }
    
    private static int InterpretLineAsActionAndOutcome(string line)
    {
        switch (line)
        {
            case "A X": return 3;
            case "A Y": return 4;
            case "A Z": return 8;
            case "B X": return 1;
            case "B Y": return 5;
            case "B Z": return 9;
            case "C X": return 2;
            case "C Y": return 6;
            case "C Z": return 7;
            default: throw new Exception($"Unrecognized line {line}");
        }
    }
    
    public static void Main(string[] argv)
    {
        if (argv.Length != 1)
            throw new Exception($"Expected 1 argument, received {argv.Length}");
        if (!File.Exists(argv[0]))
            throw new Exception($"File {argv[0]} does not exist or path invalid");
    
        var timer = Stopwatch.StartNew();
        var contents = File.ReadAllText(argv[0]).Split("\n", StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
        var scoreIfLinesAreActions = contents.Select(InterpretLineAsActions).Sum();
        var scoreIfLinesAreActionAndOutcome = contents.Select(InterpretLineAsActionAndOutcome).Sum();
        
        timer.Stop();
        Console.WriteLine($"Score if lines are actions: {scoreIfLinesAreActions}");
        Console.WriteLine($"Score if lines are action and outcome: {scoreIfLinesAreActionAndOutcome}");
        Console.WriteLine($"Completed in {timer.Elapsed.TotalMilliseconds}ms");
    }
}