#include <core_func.h>
#include <gtest/gtest.h>

TEST(find_duplicate_chars_test, no_duplicates) {
  std::vector<std::string> input_pair = {"AAAA", "BBBB"};
  std::set<char> expected;

  auto result = find_duplicate_chars(input_pair);
  EXPECT_EQ(expected, result);
}

TEST(find_duplicate_chars_test, one_duplicate) {
  std::vector<std::string> input_pair = {"AAAA", "ABBB"};
  std::set<char> expected = { 'A' };

  auto result = find_duplicate_chars(input_pair);
  EXPECT_EQ(expected, result);
}

TEST(find_duplicate_chars_test, many_duplicates) {
  std::vector<std::string> input_pair = {"ABCD", "ABCD"};
  std::set<char> expected = { 'A', 'B', 'C', 'D' };

  auto result = find_duplicate_chars(input_pair);
  EXPECT_EQ(expected, result);
}
