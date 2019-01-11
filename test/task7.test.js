'use strict';

const task = require('../src/task7.js');

const data = ['Step C must be finished before step A can begin.',
  'Step C must be finished before step F can begin.',
  'Step A must be finished before step B can begin.',
  'Step A must be finished before step D can begin.',
  'Step B must be finished before step E can begin.',
  'Step D must be finished before step E can begin.',
  'Step F must be finished before step E can begin.'
];

test('first star example', () => {
  const parser = new task.Parser(0);
  data.forEach((x) => parser.parse(x));
  expect(parser.getData().process()).toBe('CABDFE');
});

test('second star example', () => {
  const parser = new task.Parser(0);
  data.forEach((x) => parser.parse(x));
  const processor = new task.ParallelProcesor(2);
  expect(processor.process(parser.getData())).toBe(15);
});