cmake_minimum_required(VERSION 3.25)
project(day2)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(HEADER_FILES include/core_func.h)

add_executable(day2 src/main.cpp ${HEADER_FILES})
target_include_directories(${PROJECT_NAME} PUBLIC include)
