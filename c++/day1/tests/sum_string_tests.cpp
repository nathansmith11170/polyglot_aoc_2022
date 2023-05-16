//
// Created by nathan on 5/14/23.
//
#include <day1/core_func.h>
#include <gtest/gtest.h>

TEST(SplitTest, SimpleExample) {
  std::string input_str = "1\n2\n3";
  long expected_result = 6;

  long actual_result = sum_string(input_str);

  EXPECT_EQ(expected_result, actual_result);
}

TEST(SplitTest, WorkingExample) {
  std::string input_str = "6544\n9672\n13044\n4794\n6648\n8669";
  long expected_result = 49371;

  long actual_result = sum_string(input_str);

  EXPECT_EQ(expected_result, actual_result);
}
