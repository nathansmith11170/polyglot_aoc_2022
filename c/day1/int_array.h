#include "stdlib.h"

#ifndef INT_ARRAY_H
#define INT_ARRAY_H
typedef struct {
  unsigned long count;
  unsigned long capacity;
  int *data;
} IntArray;

void int_array_alloc(IntArray *array, unsigned long initial_capacity);
void int_array_free(IntArray *array);
int int_array_append(IntArray *array, int value);
int int_array_sum(IntArray *array);
void int_array_take(IntArray *destination, IntArray *array, unsigned long start,
                    unsigned long end);
#endif //INT_ARRAY_H

#ifdef INT_ARRAY_IMPLEMENTATION
void int_array_alloc(IntArray *array, unsigned long initial_capacity) {
  array->capacity = initial_capacity;
  array->count = 0;
  array->data = (int *)malloc(sizeof(int) * initial_capacity);
}

void int_array_free(IntArray *array) {
  if (array->capacity != 0) {
    free(array->data);
    array->capacity = 0;
    array->count = 0;
  }
}

int int_array_append(IntArray *array, int value) {
  if (array->count + 1 > array->capacity) {
    array->capacity *= 2;
    int *saved = array->data;
    array->data = (int *)realloc(array->data, sizeof(int) * array->capacity);
    if (array->data == NULL) {
      array->data = saved;
      return 0;
    }
  }
  array->data[array->count] = value;
  array->count++;
  return 1;
}

int int_array_sum(IntArray *array) {
  int sum = 0;
  for (unsigned long i = 0; i < array->count; ++i) {
    sum += *(array->data + i);
  }
  return sum;
}

void int_array_take(IntArray *destination, IntArray *array, unsigned long start, unsigned long end) {
  for (unsigned long i = start; i < end; ++i) {
    int_array_append(destination, array->data[i]);
  }
}
#endif //INT_ARRAY_IMPLEMENTATION
