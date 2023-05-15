#include <string>
#include <vector>
#include <cstring>
#include <exception>

#ifndef DAY2_CORE_FUNC_H
#define DAY2_CORE_FUNC_H
static std::vector<std::string> split (std::string buffer, const char* delimiter_string) {
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

static long interpret_line_as_actions (std::string line) {
    if (line == "A X") {
        return 4;
    } else if (line == "A Y") {
        return 8;
    } else if (line == "A Z") {
        return 3;
    } else if (line == "B X") {
        return 1;
    } else if (line == "B Y") {
        return 5;
    } else if (line == "B Z") {
        return 9;
    } else if (line == "C X") {
        return 7;
    } else if (line == "C Y") {
        return 2;
    } else if (line == "C Z") {
        return 6;
    } else throw std::runtime_error("Unrecognized line");
}
static long interpret_line_as_action_and_outcome (std::string line) {
    if (line == "A X") {
        return 3;
    } else if (line == "A Y") {
        return 4;
    } else if (line == "A Z") {
        return 8;
    } else if (line == "B X") {
        return 1;
    } else if (line == "B Y") {
        return 5;
    } else if (line == "B Z") {
        return 9;
    } else if (line == "C X") {
        return 2;
    } else if (line == "C Y") {
        return 6;
    } else if (line == "C Z") {
        return 7;
    } else throw std::runtime_error("Unrecognized line");
}
#endif //DAY2_CORE_FUNC_H
