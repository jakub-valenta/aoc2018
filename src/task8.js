'use strict';

class Node {
  constructor(id, children, metadata) {
    this.id = id;
    this.children = children;
    this.metadata = metadata;
  }

  sum() {
    return this.metadata.reduce((acc, item) => acc + item, 0) + this.children.reduce((acc, child) => acc + child.sum(), 0);
  }

  value() {
    if (this.children.length == 0) {
      return this.metadata.reduce((acc, item) => acc + item, 0);
    }
    let value = 0;
    for (let item of this.metadata) {
      if (item > 0 && item <= this.children.length) {
        value += this.children[item - 1].value();
      }
    }
    return value;
  }

  toString() {
    let ret = "{ \"id\": \"" + this.id.toString() + "\", \"children\": [";
    let separator = '';
    for (let child of this.children) {
      ret += separator + child.toString();
      separator = ',';
    }
    ret += "], \"metadata\": [";
    separator = '';
    for (let item of this.metadata) {
      ret += separator + '"' + item.toString() + '"';
      separator = ',';
    }
    return ret + "] }";
  }
}

class Tokenizer {
  constructor(tokens) {
    this.index = 0;
    this.tokens = tokens;
  }

  next() {
    return new Number(this.tokens[this.index++]);
  }
}

class Parser {
  constructor() {
    this.data = null;
    this.next_id = 0;
  }

  parse(line) {
    this.data = this.parseNode(new Tokenizer(line.split(' ')));
  }

  parseNode(tokens) {
    const id = this.next_id++;
    const child_count = tokens.next();
    const metadata_count = tokens.next();
    const children = [];
    for (let i = 0; i < child_count; ++i) {
      children.push(this.parseNode(tokens));
    }
    const metadata = [];
    for (let i = 0; i < metadata_count; ++i) {
      metadata.push(tokens.next());
    }
    return new Node(id, children, metadata);
  }

  getData() {
    return this.data;
  }
}

const task = require('./task');

const processor1 = new task.Processor(
  (node) => node.sum(),
  (result) => `Metadata sum: ${result}`
);

const processor2 = new task.Processor(
  (node) => node.value(),
  (result) => `Metadata value: ${result}`
);

const instance = new task.Task(new Parser(), null, processor1, processor2);

module.exports.Parser = Parser;
module.exports.task = instance;