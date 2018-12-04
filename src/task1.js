function find_repeated_frequency(frequency_changes) {
  let frequencies = new Set();
  let frequency = 0;
  let i = 0;
  while (true) {
    frequency += frequency_changes[i];
    if (frequencies.has(frequency)) {
      break;
    } else {
      frequencies.add(frequency);
    }
    i = (i + 1) % frequency_changes.length;
  }
  return frequency;
}

function parser(line) {
  return Number(line);
}

const task = require('./task');

const processor1 = new task.Processor(
  (frequency_changes) => frequency_changes.reduce((x, y) => x + y, 0),
  (frequency) => `Final frequency is ${frequency}`
);

const processor2 = new task.Processor(
  find_repeated_frequency,
  (repeated_frequency) => `Repeated frequency is ${repeated_frequency}`);

const instance = new task.Task(parser, parser, processor1, processor2);