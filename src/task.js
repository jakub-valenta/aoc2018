class Processor {
  constructor(process, format) {
    this.process = process;
    this.format = format;
  }
}

class Task {
  constructor(parser1, parser2, processor1, processor2) {
    const readline = require('readline');
    this.parser1 = parser1;
    this.parser2 = parser2;
    this.processor1 = processor1;
    this.processor2 = processor2;
    this.data1 = [];
    this.data2 = [];
    this.rl = readline.createInterface({
      input: process.stdin,
    });
    this.rl.on('line', (line) => {
      this.data1.push(parser1(line));
      this.data2.push(parser2(line));
    });

    this.rl.on('close', () => {
      console.log(this.processor1.format(this.processor1.process(this.data1)));
      console.log(this.processor2.format(this.processor2.process(this.data2)));
    });
  }
}

module.exports.Processor = Processor;
module.exports.Task = Task;