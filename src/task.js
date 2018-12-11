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
    const readline = require('readline');
    this.rl = readline.createInterface({
      input: process.stdin,
    });
    this.rl.on('line', (line) => {
      parser1.parse(line);
      if (parser2 != null) {
        parser2.parse(line);
      }
    });

    this.rl.on('close', () => {
      console.log(processor1.format(processor1.process(parser1.getData())));
      console.log(processor2.format(processor2.process(parser2 == null ? parser1.getData() : parser2.getData())));
    });
  }
}

module.exports.Processor = Processor;
module.exports.Parser = Parser;
module.exports.Task = Task;