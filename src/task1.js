
function find_repeated_frequency(frequency_changes) {
  let frequencies = new Set();
  let frequency = 0;
  let i = 0;
  while(true) {
    frequency +=  frequency_changes[i];
    if(frequencies.has(frequency)) {
      break;
    } else {
      frequencies.add(frequency);
    }
    i = (i + 1) % frequency_changes.length;
  }
  return frequency;
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

let frequency_changes = [];

rl.on('line', (line) => {
  frequency_changes.push(Number(line));
});

rl.on('close', () => {
    console.log(`Final frequency is ${frequency_changes.reduce((x, y) => x + y, 0)}`);
    console.log(`Repeated frequency is ${find_repeated_frequency(frequency_changes)}`);
});