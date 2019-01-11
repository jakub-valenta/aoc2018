'use strict';

const task = require('../src/task8.js');

const data = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

test('first star example', () => {
  const parser = new task.Parser();
  parser.parse(data);
  expect(parser.getData().sum()).toBe(138);
});

test('second star example', () => {
  const parser = new task.Parser();
  parser.parse(data);
  expect(parser.getData().value()).toBe(66);
});