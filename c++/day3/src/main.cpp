#include <iostream>
#include <filesystem>
#include <fstream>

int main(int argc, char *argv[])
{
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
}
