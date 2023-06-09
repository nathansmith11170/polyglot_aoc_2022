#include <day1/core_func.h>
#include <gtest/gtest.h>

TEST(SplitTest, SplitStringByComma) {
  std::string input_str = "apple,banana,orange";
  const char *delimiter = ",";
  std::vector<std::string> expected_tokens = {"apple", "banana", "orange"};

  std::vector<std::string> actual_tokens = split(input_str, delimiter);

  EXPECT_EQ(expected_tokens, actual_tokens);
}

TEST(SplitTest, SplitStringBySpace) {
  std::string input_str = "apple banana orange";
  const char *delimiter = " ";
  std::vector<std::string> expected_tokens = {"apple", "banana", "orange"};

  std::vector<std::string> actual_tokens = split(input_str, delimiter);

  EXPECT_EQ(expected_tokens, actual_tokens);
}

TEST(SplitTest, SplitStringByDoubleSpace) {
  std::string input_str = "apple  banana  orange";
  const char *delimiter = "  ";
  std::vector<std::string> expected_tokens = {"apple", "banana", "orange"};

  std::vector<std::string> actual_tokens = split(input_str, delimiter);

  EXPECT_EQ(expected_tokens, actual_tokens);
}

TEST(SplitTest, SplitStringByDoubleNewline) {
  std::string input_str = "apple\n\nbanana\n\norange";
  const char *delimiter = "\n\n";
  std::vector<std::string> expected_tokens = {"apple", "banana", "orange"};

  std::vector<std::string> actual_tokens = split(input_str, delimiter);

  EXPECT_EQ(expected_tokens, actual_tokens);
}

TEST(SplitTest, SplitStringByNewline) {
  std::string input_str = "\napple\nbanana\norange\n";
  const char *delimiter = "\n";
  std::vector<std::string> expected_tokens = {"apple", "banana", "orange"};

  std::vector<std::string> actual_tokens = split(input_str, delimiter);

  EXPECT_EQ(expected_tokens, actual_tokens);
}
