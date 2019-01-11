'use strict';

class Processor {
  constructor(process, format) {
    this.process = process;
    this.format = format;
  }
}

class Parser {
  constructor(parser, data) {
    this.parser = parser;
    this.data = data;
  }

  parse(line) {
    this.data.push(this.parser(line));
  }

  getData() {
    return this.data;
  }
}

class Task {
  constructor(parser1, parser2, processor1, processor2) {
    this.parser1 = parser1;
    this.parser2 = parser2;
    this.processor1 = processor1;
    this.processor2 = processor2;
  }

  run() {
    const readline = require('readline');
    this.rl = readline.createInterface({
      input: process.stdin,
    });
    this.rl.on('line', (line) => {
      this.parser1.parse(line);
      if (this.parser2 !== null) {
        this.parser2.parse(line);
      }
    });

    this.rl.on('close', () => {
      console.log(this.processor1.format(this.processor1.process(this.parser1.getData())));
      if (this.processor2 !== null) {
        console.log(this.processor2.format(this.processor2.process(this.parser2 == null ? this.parser1.getData() : this.parser2.getData())));
      }
    });
  }
}

module.exports.Processor = Processor;
module.exports.Parser = Parser;
module.exports.Task = Task;