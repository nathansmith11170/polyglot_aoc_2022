#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} IntArray;

void int_array_init (IntArray *array, size_t initial_capacity) {
    array->data = malloc(initial_capacity * sizeof(int));
    array->size = 0;
    array->capacity = initial_capacity;
}

void int_array_append (IntArray *array, int value) {
    if (array->size == array->capacity) {
        array->capacity *= 2;
        array->data = realloc(array->data, array->capacity * sizeof(int));
    }

    array->data[array->size] = value;
    array->size++;
}

void int_array_free (IntArray *array) {
    free(array->data);
    array->data = NULL;
    array->size = 0;
    array->capacity = 0;
}

int int_array_sum (IntArray *array) {
    int sum = 0;
    for (int i = 0; i < array->size; i++) {
        sum += array->data[i];
    }
    return sum;
}

void int_array_take (IntArray *array, IntArray *slice, int start, int end) {
    if (slice->data) {
        int_array_free(slice);
    }
    int_array_init(slice, 2);

    for (int i = start; i < end; i++) {
        int_array_append(slice, array->data[i]);
    }
}

int sum_chunk (char *chunk) {
    IntArray parsed_numbers;
    int_array_init(&parsed_numbers, 2);
    char *line = strtok(chunk, "\n");
    do {
        int_array_append(&parsed_numbers, atoi(line));
        line = strtok(NULL, "\n");
    } while(line != NULL);

    int result = int_array_sum(&parsed_numbers);
    int_array_free(&parsed_numbers);
    return result;
}

int compare (const void *a, const void *b) {
    const int* ia = (const int*) a;
    const int* ib = (const int*) b;
    return *ib - *ia;
}

int main (int argc, char *argv[]) {
    if (argc != 2) {
        printf("Expected 1 argument, received: %d", argc - 1);
        exit(1);
    }

    if (access(argv[1], F_OK) == -1) {
        printf("The file at %s does not exist", argv[1]);
        exit(1);
    }

    FILE* input_file = fopen(argv[1], "r");

    clock_t start_time = clock();
    fseek(input_file, 0, SEEK_END);
    long size = ftell(input_file);
    fseek(input_file, 0, SEEK_SET);

    char* contents = (char*) malloc(size+1);
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
    int_array_init(&inventories, 2);
    char *chunk, *next_chunk;
    chunk = contents;
    while ((next_chunk = strstr(chunk, "\n\n")) != NULL) {
        *next_chunk = '\0';
        int_array_append(&inventories, sum_chunk(contents));
        chunk = next_chunk + strlen("\n\n");
    }

    free(contents);

    qsort(inventories.data, inventories.size, sizeof(int), compare);

    IntArray top_three;
    int_array_take(&inventories, &top_three, 0, 3);
    int top_three_sum = int_array_sum(&top_three);
    int_array_free(&top_three);

    clock_t end_time = clock();

    printf("The largest inventory is %d\n", inventories.data[0]);
    int_array_free(&inventories);
    printf("The top three inventories have %d\n", top_three_sum);
    printf("Time elapsed: %f ms\n", (end_time - start_time) / CLOCKS_PER_SEC / 1000);

    exit(0);
}
