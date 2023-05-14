//
// Created by nathan on 5/14/23.
//
#include <string>
#include <vector>
#include <sstream>
#include <cstring>

#ifndef DAY1_CORE_FUNC_H
#define DAY1_CORE_FUNC_H
static std::vector<std::string> split (std::string buffer, const char* delimiter_string) {
    std::vector<std::string> tokens;
    std::string token;
    size_t start = 0;
    size_t delim_index = 0;

    while (delim_index != std::string::npos) {
        delim_index = buffer.find(delimiter_string, start);
        token = buffer.substr(start, delim_index - start);
        tokens.push_back(token);
        start = delim_index + strlen(delimiter_string);
    }

    return tokens;
}

static long sum_string (std::string buffer) {
    long sum = 0;
    std::string token;
    std::string delimiter_string("\n");
    size_t start = 0;
    size_t delim_index = 0;

    while (delim_index != std::string::npos) {
        delim_index = buffer.find(delimiter_string, start);
        token = buffer.substr(start, delim_index - start);
        sum += stol(token);
        start = delim_index + delimiter_string.size();
    }
    return sum;
}
#endif //DAY1_CORE_FUNC_H
