﻿module FSharp.Item

type Item =
    | a = 1
    | b = 2
    | c = 3
    | d = 4
    | e = 5
    | f = 6
    | g = 7
    | h = 8
    | i = 9
    | j = 10
    | k = 11
    | l = 12
    | m = 13
    | n = 14
    | o = 15
    | p = 16
    | q = 17
    | r = 18
    | s = 19
    | t = 20
    | u = 21
    | v = 22
    | w = 23
    | x = 24
    | y = 25
    | z = 26
    | A = 27
    | B = 28
    | C = 29
    | D = 30
    | E = 31
    | F = 32
    | G = 33
    | H = 34
    | I = 35
    | J = 36
    | K = 37
    | L = 38
    | M = 39
    | N = 40
    | O = 41
    | P = 42
    | Q = 43
    | R = 44
    | S = 45
    | T = 46
    | U = 47
    | V = 48
    | W = 49
    | X = 50
    | Y = 51
    | Z = 52

let matchCharacterToItem character =
    match character with
        | 'a' -> Item.a
        | 'b' -> Item.b
        | 'c' -> Item.c
        | 'd' -> Item.d
        | 'e' -> Item.e
        | 'f' -> Item.f
        | 'g' -> Item.g
        | 'h' -> Item.h
        | 'i' -> Item.i
        | 'j' -> Item.j
        | 'k' -> Item.k
        | 'l' -> Item.l
        | 'm' -> Item.m
        | 'n' -> Item.n
        | 'o' -> Item.o
        | 'p' -> Item.p
        | 'q' -> Item.q
        | 'r' -> Item.r
        | 's' -> Item.s
        | 't' -> Item.t
        | 'u' -> Item.u
        | 'v' -> Item.v
        | 'w' -> Item.w
        | 'x' -> Item.x
        | 'y' -> Item.y
        | 'z' -> Item.z
        | 'A' -> Item.A
        | 'B' -> Item.B
        | 'C' -> Item.C
        | 'D' -> Item.D
        | 'E' -> Item.E
        | 'F' -> Item.F
        | 'G' -> Item.G
        | 'H' -> Item.H
        | 'I' -> Item.I
        | 'J' -> Item.J
        | 'K' -> Item.K
        | 'L' -> Item.L
        | 'M' -> Item.M
        | 'N' -> Item.N
        | 'O' -> Item.O
        | 'P' -> Item.P
        | 'Q' -> Item.Q
        | 'R' -> Item.R
        | 'S' -> Item.S
        | 'T' -> Item.T
        | 'U' -> Item.U
        | 'V' -> Item.V
        | 'W' -> Item.W
        | 'X' -> Item.X
        | 'Y' -> Item.Y
        | 'Z' -> Item.Z
        | character -> invalidArg (string character) "Unrecognized item"