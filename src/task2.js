'use strict';

function calculateChecksum(id_indices) {
  let doubles = 0;
  let triples = 0;
  for (const id_index of id_indices) {
    let contain_double = false;
    let contain_triple = false;
    id_index.forEach((value) => {
      switch (value) {
        case 2:
          contain_double = true;
          break;
        case 3:
          contain_triple = true;
          break;
      }
    });
    if (contain_double) {
      ++doubles;
    }
    if (contain_triple) {
      ++triples;
    }
  }
  return doubles * triples;
}

function findClosest(ids) {
  while (ids.length > 0) {
    const id = ids.pop();
    for (const it of ids) {
      if (distance(id, it) == 1) {
        return removeDifferent(id, it);
      }
    }
  }
  return "";
}

function distance(left, right) {
  let distance = 0;
  for (let i = 0; i < left.length; ++i) {
    if (left[i] != right[i]) {
      ++distance;
    }
  }
  return distance;
}

function removeDifferent(left, right) {
  let same = "";
  for (let i = 0; i < left.length; ++i) {
    if (left[i] == right[i]) {
      same = same.concat(left[i]);
    }
  }
  return same;
}

const task = require('./task');

function indexParser(line) {
  let index = new Map();
  for (const c of line) {
    let count = 1;
    if (index.has(c)) {
      count = index.get(c) + 1;
    }
    index.set(c, count);
  }
  return index;
}

const instance = new task.Task(
  new task.Parser(indexParser, []),
  new task.Parser((line) => line, []),
  new task.Processor(calculateChecksum, (checksum) => `Checksum is ${checksum}`),
  new task.Processor(findClosest, (id) => `Common letters in correct IDs: ${id}`));

module.exports.indexParser = indexParser;
module.exports.calculateChecksum = calculateChecksum;
module.exports.findClosest = findClosest;
module.exports.task = instance;