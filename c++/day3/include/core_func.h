#include <string>
#include <vector>
#include <cstring>
#include <set>

#ifndef DAY2_CORE_FUNC_H
#define DAY2_CORE_FUNC_H
static std::vector<std::string> split(std::string buffer, const char* delimiter_string) {
  std::vector<std::string> tokens;
  std::string token;
  size_t start = 0;
  size_t delim_index = 0;

  while (delim_index != std::string::npos) {
    delim_index = buffer.find(delimiter_string, start);
    token = buffer.substr(start, delim_index - start);
    if (!token.empty()) tokens.push_back(token);
    start = delim_index + strlen(delimiter_string);
  }

  return tokens;
}

static std::vector<std::string> split_string_at_middle(std::string buffer) {
  std::vector<std::string> two_strings;
  two_strings.push_back(buffer.substr(0, buffer.size()/2));
  two_strings.push_back(buffer.substr(buffer.size()/2, buffer.size()));
  return two_strings;
}

static std::set<char> find_duplicate_chars(std::vector<std::string> strings) {
  std::set<char> duplicates;
  for (auto c1 : strings[0]) {
    if(strchr(strings[1].c_str(), c1) != NULL && duplicates.count(c1) == 0) {
      duplicates.insert(c1);
    }
  }
  return duplicates;
}

static std::vector<size_t> translate_chars_to_priority(std::set<char> chars) {
  std::vector<size_t> results;
  const char *alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (auto c : chars) {
    for (size_t i = 0; i < strlen(alphabet); ++i) {
      if (c == *(alphabet + i)) {
        results.push_back(i + 1);
        break;
      }
    }
  }
  return results;
}

static std::vector<std::vector<std::string>> chunk_vector(std::vector<std::string> in_vector) {
  std::vector<std::vector<std::string>> result;
  for(size_t span = 0; span < in_vector.size(); span += 3) {
    std::vector<std::string> slice;
    slice.push_back(in_vector[span]);
    slice.push_back(in_vector[span+1]);
    slice.push_back(in_vector[span+2]);
    result.push_back(slice);
  }
  return result;
}

static std::set<char> find_common_char(std::vector<std::string> in_vector) {
  std::set<char> result;
  for (auto c : in_vector[0]) {
    bool in_all = true;
    for(size_t i = 1; i < in_vector.size(); ++i) {
      if(strchr(in_vector[i].c_str(), c) == nullptr) {
        in_all = false;
        break;
      }
    }
    if (in_all) {
      result.insert(c);
      return result;
    }
  }
  return result;
}
#endif //DAY2_CORE_FUNC_H
