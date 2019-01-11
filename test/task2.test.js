'use strict';

const task = require('../src/task2.js');

const example1 = ['abcdef', 'bababc', 'abbcde', 'abcccd', 'aabcdd', 'abcdee', 'ababab'];

test('first star example', () => {
  expect(task.calculateChecksum(example1.map(task.indexParser))).toBe(12);
});

test('second star example', () => {
  expect(task.findClosest(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'])).toBe('fgij');
});