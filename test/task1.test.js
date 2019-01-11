'use strict';

const task = require('../src/task1.js');

test('first star example 1', () => {
  expect(task.calculateFrequency([1, -2, 3, 1])).toBe(3);
});

test('first star example 2', () => {
  expect(task.calculateFrequency([1, 1, 1])).toBe(3);
});

test('first star example 3', () => {
  expect(task.calculateFrequency([1, 1, -2])).toBe(0);
});

test('first star example 4', () => {
  expect(task.calculateFrequency([-1, -2, -3])).toBe(-6);
});

test('second star example 1', () => {
  expect(task.findRepeatedFrequency([1, -1])).toBe(0);
});

test('second star example 2', () => {
  expect(task.findRepeatedFrequency([3, 3, 4, -2, -4])).toBe(10);
});

test('second star example 3', () => {
  expect(task.findRepeatedFrequency([-6, 3, 8, 5, -6])).toBe(5);
});

test('second star example 4', () => {
  expect(task.findRepeatedFrequency([7, 7, -2, -7, -4])).toBe(14);
});