cmake_minimum_required(VERSION 3.25)
project(day1)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(GTest CONFIG REQUIRED)

set(HEADER_FILES include/day1/core_func.h)

add_executable(${PROJECT_NAME} src/main.cpp ${HEADER_FILES})
target_include_directories(${PROJECT_NAME} PUBLIC include)

add_executable(${PROJECT_NAME}_test tests/main.cpp tests/split_tests.cpp tests/sum_string_tests.cpp ${HEADER_FILES})
target_include_directories(${PROJECT_NAME}_test PRIVATE include)
target_link_libraries(${PROJECT_NAME}_test PRIVATE GTest::gmock GTest::gtest GTest::gmock_main GTest::gtest_main)
