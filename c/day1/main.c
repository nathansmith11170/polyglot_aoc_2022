#include "stdio.h"
#include "string.h"
#include "time.h"
#include "unistd.h"

#define INT_ARRAY_IMPLEMENTATION 1
#include "int_array.h"

int sum_chunk(char *chunk) {
  IntArray parsed_numbers;
  int_array_alloc(&parsed_numbers, 2);
  char *line = strtok(chunk, "\n");
  do {
    int_array_append(&parsed_numbers, atoi(line));
    line = strtok(NULL, "\n");
  } while (line != NULL);

  int result = int_array_sum(&parsed_numbers);
  int_array_free(&parsed_numbers);
  return result;
}

int compare(const void *a, const void *b) {
  const int *ia = (const int *)a;
  const int *ib = (const int *)b;
  return *ib - *ia;
}

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Expected 1 argument, received: %d", argc - 1);
    exit(1);
  }

  if (access(argv[1], F_OK) == -1) {
    printf("The file at %s does not exist", argv[1]);
    exit(1);
  }

  FILE *input_file = fopen(argv[1], "r");

  struct timespec t0, t1;
  if (clock_gettime(CLOCK_REALTIME, &t0) != 0) {
    perror("Error in calling clock_gettime");
    exit(EXIT_FAILURE);
  }

  fseek(input_file, 0, SEEK_END);
  unsigned long size = ftell(input_file);
  fseek(input_file, 0, SEEK_SET);

  char *contents = (char *)malloc(size + 1);
  if (!contents) {
    printf("Error allocating memory for file contents!");
    fclose(input_file);
    exit(1);
  }

  size_t read = fread(contents, 1, size, input_file);
  if (read != size) {
    printf("Error reading file!");
    free(contents);
    fclose(input_file);
    exit(1);
  }

  contents[size] = '\0';
  fclose(input_file);

  IntArray inventories;
  int_array_alloc(&inventories, 2);
  char *chunk, *next_chunk;
  chunk = contents;
  while ((next_chunk = strstr(chunk, "\n\n")) != NULL) {
    *next_chunk = '\0';
    int_array_append(&inventories, sum_chunk(chunk));
    chunk = next_chunk + strlen("\n\n");
  }

  qsort(inventories.data, inventories.count, sizeof(int), compare);

  IntArray top_three;
  int_array_alloc(&top_three, 2);
  int_array_take(&top_three, &inventories, 0, 3);
  int top_three_sum = int_array_sum(&top_three);
  int_array_free(&top_three);

  if (clock_gettime(CLOCK_REALTIME, &t1) != 0) {
    perror("Error in calling clock_gettime");
    exit(EXIT_FAILURE);
  }
  double diff = (double)(t1.tv_sec - t0.tv_sec) + ((double)(t1.tv_nsec - t0.tv_nsec)/1000000L);
  printf("The largest inventory is %d\n", inventories.data[0]);
  printf("The top three inventories have %d\n", top_three_sum);
  printf("Time elapsed: %f ms\n", diff);

  exit(0);
}
