using System.Diagnostics;
using System.Diagnostics.Contracts;

namespace Day1;

internal static class Program
{
    private static int SumStrings(this string strings)
    {
        return strings
            .Split('\n', StringSplitOptions.RemoveEmptyEntries)
            .Select(int.Parse)
            .Sum();
    }

    private static void Main(string[] args)
    {
        if (args.Length != 1)
            throw new Exception($"Expected 1 argument, received {args.Length}");
        if (!File.Exists(args[0]))
            throw new Exception($"File {args[0]} does not exist or path invalid");

        var timer = Stopwatch.StartNew();
        var calorieCounts = File.ReadAllText(args[0])
            .Split("\n\n", StringSplitOptions.RemoveEmptyEntries)
            .Select(SumStrings)
            .OrderDescending();
        timer.Stop();
        
        Console.WriteLine($"Highest: {calorieCounts.First()}");
        Console.WriteLine($"Top Three: {calorieCounts.Take(3).Sum()}");
        Console.WriteLine($"Completed in {timer.Elapsed.TotalMilliseconds}ms");
    }
}