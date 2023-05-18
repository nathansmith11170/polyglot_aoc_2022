#include <filesystem>
#include <fstream>
#include <iostream>
#include <vector>
#include <core_func.h>

using std::string;
using std::vector;
using std::endl;

int main(int argc, char *argv[]) {
  if (argc != 2) {
    std::cerr << "Expected 2 arguments, received " << argc << endl;
    exit(1);
  }

  std::filesystem::path file_path(argv[1]);
  if (!std::filesystem::exists(file_path)) {
    std::cerr << "File does not exist: " << argv[1] << endl;
    exit(1);
  }
  auto file_status = std::filesystem::status(file_path);
  if ((file_status.permissions() & std::filesystem::perms::owner_read) == std::filesystem::perms::none) {
    std::cerr << "Insufficient privileges to read " << argv[1] << endl;
    exit(1);
  }

  std::ifstream input_file;
  input_file.open(file_path);

  input_file.seekg(0, std::ios::end);
  std::streamsize size = input_file.tellg();
  input_file.seekg(0, std::ios::beg);

  auto start = std::chrono::high_resolution_clock::now();
  string contents(size, '\0');
  if (!input_file.read(contents.data(), size)) {
    std::cerr << "Error reading file contents" << endl;
    input_file.close();
    exit(1);
  }

  vector<string> lines = split(contents, "\n");
  unsigned long sum_priorities = 0;
  for (auto line : lines) {
    auto pair = split_string_at_middle(line);
    auto duplicates = find_duplicate_chars(pair);
    auto priorities = translate_chars_to_priority(duplicates);
    for(auto priority : priorities) {
      sum_priorities += priority;
    }
  }

  auto chunks = chunk_vector(lines);
  unsigned long badges = 0;
  for (auto chunk : chunks) {
    auto common_char = find_common_char(chunk);
    auto priorities = translate_chars_to_priority(common_char);
    badges += priorities[0];
  }

  auto end = std::chrono::high_resolution_clock::now();
  auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
  std::cout << "The sum of duplicate item priorities is: " << sum_priorities << endl;
  std::cout << "The sum of badges in trios is: " << badges << endl;
  std::cout << "Calculated in: " << duration.count() / 1000000.0 << "ms" << std::endl;
}
