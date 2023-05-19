cmake_minimum_required(VERSION 3.25)
project(day1 C)

set(CMAKE_C_STANDARD 17)
set(CMAKE_C_STANDARD_REQUIRED ON)

add_compile_options(-Wall -Wextra -Wpedantic)
add_executable(day1 main.c)
include_directories(day1)
