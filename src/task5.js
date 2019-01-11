'use strict';

class Polymer {
  constructor() {
    this.head = null;
    this.last = null;
    this.size = 0;
    this.units = new Set();
  }

  append(unit) {
    ++this.size;
    this.units.add(unit.toLowerCase());
    let item = {
      next: null,
      previous: null,
      unit: unit
    }
    if (this.head === null) {
      this.head = item;
      this.last = this.head;
    } else {
      item.previous = this.last;
      this.last.next = item;
      this.last = this.last.next;
    }
  }

  remove(x) {
    --this.size;
    if (x == this.head) {
      this.head = this.head.next;
      this.head.previous = null;
      return this.head;
    } else if (x == this.last) {
      x.previous.next = null;
      this.last = x.previous;
      return this.last;
    } else {
      x.next.previous = x.previous;
      x.previous.next = x.next;
      return x.previous;
    }
  }

  reduce() {
    for (let i = this.head; i !== this.last;) {
      const ci = i.unit;
      const cii = i.next.unit;
      if (ci !== cii && ci.toLowerCase() === cii.toLowerCase()) {
        this.remove(i.next);
        i = this.remove(i);
      } else {
        i = i.next;
      }
    }
    return this.size;
  }

  removeUnit(unit) {
    const polymer = new Polymer();
    for (let i = this.head; i !== null; i = i.next) {
      if (i.unit.toLowerCase() !== unit) {
        polymer.append(i.unit);
      }
    }
    return polymer;
  }

  reduceUnblocked() {
    let smallest = this.size;
    for (let unit of this.units) {
      const size = this.removeUnit(unit).reduce();
      if (size < smallest) {
        smallest = size;
      }
    }
    return smallest;
  }
}


class Parser {
  constructor() {
    this.polymer = new Polymer();
  }

  parse(line) {
    for (let i = 0; i < line.length; ++i) {
      const unit = line.charAt(i);
      this.polymer.append(unit);
    }
  }

  getData() {
    return this.polymer;
  }
}

const task = require('./task');

const processor1 = new task.Processor(
  (polymer) => polymer.reduce(),
  (unit_count) => `Units remaining after reduction ${unit_count}`
);

const processor2 = new task.Processor(
  (polymer) => polymer.reduceUnblocked(),
  (unit_count) => `Units remaining after unblocked reduction ${unit_count}`
);

const instance = new task.Task(new Parser(),
  null,
  processor1,
  processor2);

module.exports.Parser = Parser;
module.exports.task = instance;