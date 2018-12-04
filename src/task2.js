function calculate_checksum(id_indices) {
  let doubles = 0;
  let triples = 0;
  for (const id_index of id_indices) {
    let contain_double = false;
    let contain_triple = false;
    id_index.forEach((value, key, map) => {
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

function find_closest(ids) {
  while (ids.length > 0) {
    const id = ids.pop();
    for (const it of ids) {
      if (distance(id, it) == 1) {
        return remove_different(id, it);
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

function remove_different(left, right) {
  let same = "";
  for (let i = 0; i < left.length; ++i) {
    if (left[i] == right[i]) {
      same = same.concat(left[i]);
    }
  }
  return same;
}

const task = require('./task');

function index_parser(line) {
  let index = new Map();
  for (const c of line) {
    let count = 1;
    if (index.has(c)) {
      count = index.get(c) + 1;
    }
    index.set(c, count);
  }
  return index;
};

const instance = new task.Task(
  index_parser,
  (line) => line,
  new task.Processor(calculate_checksum, (checksum) => `Checksum is ${checksum}`),
  new task.Processor(find_closest, (id) => `Common letters in correct IDs: ${id}`));