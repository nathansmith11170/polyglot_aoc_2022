package main

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type File struct {
	name      string
	full_name string
	size      uint64
	parent    *Directory
}

type Directory struct {
	name      string
	full_name string
	parent    *Directory
	children  []Directory
	contents  []File
}

func (dir *Directory) getSize() uint64 {
	var size uint64
	size = 0

	for _, file := range dir.contents {
		size += file.size
	}

	for _, child_dir := range dir.children {
		size += child_dir.getSize()
	}
	return size
}

func sumDirectoriesSmallerThan(root *Directory, size uint64) uint64 {
	var total uint64
	total = 0
	size_of_this := root.getSize()
	if size_of_this < size {
		total += size_of_this
	}
	for _, dir := range root.children {
		total += sumDirectoriesSmallerThan(&dir, size)
	}
	return total
}

func findSmallestDirectoryLargerThan(root *Directory, size uint64) uint64 {
	var smallest uint64
	smallest = 70000000

	size_of_this := root.getSize()
	if size_of_this < smallest && size_of_this > size {
		smallest = size_of_this
	}
	for _, dir := range root.children {
		var smallest_in_child uint64
		smallest_in_child = findSmallestDirectoryLargerThan(&dir, size)
		if smallest_in_child < smallest && smallest_in_child > size {
			smallest = smallest_in_child
		}
	}
	return smallest
}

func addFile(dir *Directory, name string, size string) {
	size_i64, err := strconv.ParseUint(size, 10, 64)
	if err != nil {
		fmt.Printf("Cannot parse %s as integer", size)
		os.Exit(1)
	}
	dir.contents = append(dir.contents, File{name: name, full_name: dir.full_name + "/" + name, size: size_i64, parent: dir})
}

func addDirectory(dir *Directory, name string) {
	dir.children = append(dir.children, Directory{name: name, full_name: dir.full_name + "/" + name, parent: dir, children: make([]Directory, 0, 1), contents: make([]File, 0, 1)})
}

func changeDirectory(current_directory *Directory, root *Directory, destination string) (*Directory, error) {
	if destination == "/" {
		return root, nil
	} else if destination == ".." {
		if current_directory.parent != nil {
			return current_directory.parent, nil
		} else {
			return nil, errors.New("Cannot go to parent of root")
		}
	} else {
		index := -1
		for i, dir := range current_directory.children {
			if dir.name == destination {
				index = i
				break
			}
		}

		if index != -1 {
			return &current_directory.children[index], nil
		} else {
			return nil, errors.New(fmt.Sprintf("No child %s in directory %s", destination, current_directory.full_name))
		}
	}
}

func readOutputIntoDirectoryTree(input string) *Directory {
	root := Directory{
		name:      "/",
		full_name: "",
		parent:    nil,
		children:  make([]Directory, 0, 1),
		contents:  make([]File, 0, 1),
	}
	cwd := &root

	lines := strings.Split(input, "\n")

	for _, line := range lines {
		if line == "" {
			continue
		}
		tokens := strings.Split(line, " ")
		if tokens[0] == "$" {
			if tokens[1] == "cd" {
				next_dir, err := changeDirectory(cwd, &root, tokens[2])
				if err != nil {
					fmt.Printf("Error changing directory: %s\n", err)
					os.Exit(1)
				}
				cwd = next_dir
			} else {
				continue
			}
		} else {
			if tokens[0] == "dir" {
				addDirectory(cwd, tokens[1])
			} else {
				addFile(cwd, tokens[1], tokens[0])
			}
		}
	}

	return &root
}

func main() {
	if len(os.Args) != 2 {
		fmt.Println("Wrong number of arguments, expected filename.")
		os.Exit(1)
	}

	input_file, err := os.Open(os.Args[1])
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
	defer input_file.Close()

	start := time.Now()
	scanner := bufio.NewScanner(input_file)
	var input_builder strings.Builder
	for scanner.Scan() {
		input_builder.WriteString(scanner.Text())
		input_builder.WriteRune('\n')
	}

	root := readOutputIntoDirectoryTree(input_builder.String())
	sum_directories_smaller_than_100k := sumDirectoriesSmallerThan(root, 100000)

	var (
		total_memory   uint64
		memory_needed  uint64
		memory_used    uint64
		memory_unused  uint64
		memory_to_free uint64
	)

	total_memory = 70000000
	memory_needed = 30000000
	memory_used = root.getSize()
	memory_unused = total_memory - memory_used
	memory_to_free = memory_needed - memory_unused

	smallest_directory_large_enough := findSmallestDirectoryLargerThan(root, memory_to_free)

	fmt.Printf("The sum of all directores with size at most 100000: %d\n", sum_directories_smaller_than_100k)
	fmt.Printf("The smallest directory which can be deleted to allow the update: %d\n", smallest_directory_large_enough)
	fmt.Printf("Calculated in: %v\n", time.Since(start))
}
