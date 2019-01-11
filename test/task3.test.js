'use strict';

const task = require('../src/task3.js');

const data = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'].map(task.parse);

test('first star example', () => {
  expect(task.findOverlaping(data)).toBe(4);
});

test('second star example', () => {
  expect(task.findIntact(data)).toBe(3);
});