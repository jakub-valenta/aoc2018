const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

let id_indices = [];

rl.on('line', (line) => {
  let index = new Map();
  for(const c of line) {
    let count = 1;
    if(index.has(c)) {
      count = index.get(c) + 1;
    }
    index.set(c, count);
  }
  id_indices.push(index);
});

rl.on('close', () => {
  console.log(`Checksum is ${calculate_checksum(id_indices)}`);
});

function calculate_checksum(id_indices) {
  let doubles = 0;
  let triples = 0;
  for(const id_index of id_indices) {
    let contain_double = false;
    let contain_triple = false;
    id_index.forEach((value, key, map) => {switch(value) {
      case 2: contain_double = true; break;
      case 3: contain_triple = true; break;
    }});
    if(contain_double) {
      ++doubles;
    }
    if(contain_triple) {
      ++triples;
    }
  }
  return doubles * triples;
}