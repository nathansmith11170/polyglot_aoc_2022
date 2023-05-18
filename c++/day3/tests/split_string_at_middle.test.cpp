#include <core_func.h>
#include <gtest/gtest.h>

TEST(split_string_at_middle_test, working_example) {
  std::string input_str = "LHLRlCCvCLVgHPfCHtVjBGrBDNzWFBsBGBfscGsD";
  std::vector<std::string> expected_tokens = {"LHLRlCCvCLVgHPfCHtVj", "BGrBDNzWFBsBGBfscGsD"};

  auto result = split_string_at_middle(input_str);
  EXPECT_EQ(expected_tokens, result);
}