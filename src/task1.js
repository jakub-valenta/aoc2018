function findRepeatedFrequency(frequency_changes) {
  let frequencies = new Set();
  let frequency = 0;
  let i = 0;
  for (;;) {
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

const task = require('./task');

const processor1 = new task.Processor(
  (frequency_changes) => frequency_changes.reduce((x, y) => x + y, 0),
  (frequency) => `Final frequency is ${frequency}`
);

const processor2 = new task.Processor(
  findRepeatedFrequency,
  (repeated_frequency) => `Repeated frequency is ${repeated_frequency}`);

new task.Task(
  new task.Parser((line) => Number(line), []),
  null,
  processor1,
  processor2);