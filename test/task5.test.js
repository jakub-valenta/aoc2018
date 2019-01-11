'use strict';

const task = require('../src/task5.js');

test('first star example', () => {
  const parser = new task.Parser();
  parser.parse('dabAcCaCBAcCcaDA');
  expect(parser.getData().reduce()).toBe(10);
});

test('second star example', () => {
  const parser = new task.Parser();
  parser.parse('dabAcCaCBAcCcaDA');
  expect(parser.getData().reduceUnblocked()).toBe(4);
});