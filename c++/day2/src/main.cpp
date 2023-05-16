#include <chrono>
#include <core_func.h>
#include <filesystem>
#include <fstream>
#include <iostream>

int main(int argc, char *argv[]) {
  if (argc != 2) {
    std::cerr << "Expected 2 arguments, received " << argc << std::endl;
    exit(1);
  }

  std::filesystem::path file_path(argv[1]);
  if (!std::filesystem::exists(file_path)) {
    std::cerr << "File does not exist: " << argv[1] << std::endl;
    exit(1);
  }
  auto file_status = std::filesystem::status(file_path);
  if ((file_status.permissions() & std::filesystem::perms::owner_read) == std::filesystem::perms::none) {
    std::cerr << "Insufficient privileges to read " << argv[1] << std::endl;
    exit(1);
  }

  std::ifstream input_file;
  input_file.open(file_path);

  input_file.seekg(0, std::ios::end);
  std::streamsize size = input_file.tellg();
  input_file.seekg(0, std::ios::beg);

  auto start = std::chrono::high_resolution_clock::now();
  std::string contents(size, '\0');
  if (!input_file.read(contents.data(), size)) {
    std::cerr << "Error reading file contents" << std::endl;
    input_file.close();
    exit(1);
  }

  auto lines = split(contents, "\n");
  long score_if_lines_are_actions = 0;
  long score_if_lines_are_action_and_outcome = 0;
  for (const auto &line : lines) {
    score_if_lines_are_actions += interpret_line_as_actions(line);
    score_if_lines_are_action_and_outcome += interpret_line_as_action_and_outcome(line);
  }

  auto end = std::chrono::high_resolution_clock::now();
  auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
  std::cout << "The score if lines are actions is: " << score_if_lines_are_actions << std::endl;
  std::cout << "The score if line are action and outcome is: " << score_if_lines_are_action_and_outcome << std::endl;
  std::cout << "Calculated in: " << duration.count() / 1000000.0 << "ms" << std::endl;
  return 0;
}
