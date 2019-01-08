class Step {
  constructor(id) {
    this.id = id;
    this.preceding = [];
  }

  addPreceding(step) {
    this.preceding.push(step);
  }

  duration() {
    return 61 + this.id.charCodeAt(0) - "A".charCodeAt(0);
  }
}

class Instruction {
  constructor() {
    this.steps = new Map();
  }

  addStepRelation(step_id, preceding_step_id) {
    const step = this.getStep(step_id);
    const preceding_step = this.getStep(preceding_step_id);
    step.addPreceding(preceding_step);
  }

  getStep(step_id) {
    if (!this.steps.has(step_id)) {
      this.steps.set(step_id, new Step(step_id));
    }
    return this.steps.get(step_id);
  }

  process() {
    let result = "";
    const unfinished = new Map(this.steps);
    while (unfinished.size > 0) {
      let available = findAvailable(unfinished);
      let step = available[0];
      result += step.id;
      unfinished.delete(step.id);
    }
    return result;
  }

}

function findAvailable(steps) {
  let available = [];
  for (let [, step] of steps) {
    if (steps.size == 0 || isAvailable(steps, step.preceding)) {
      available.push(step);
    }
  }
  available.sort(function(a, b) {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1
    } else {
      return 0;
    }
  });
  return available;
}

function isAvailable(steps, prerequisites) {
  for (let step of prerequisites) {
    if (steps.has(step.id)) {
      return false;
    }
  }
  return true;
}

class Parser {
  constructor() {
    this.data = new Instruction();
  }

  parse(line) {
    const regex = /Step (.) must be finished before step (.) can begin\./;
    const rules = line.match(regex);
    this.data.addStepRelation(rules[2], rules[1]);
  }

  getData() {
    return this.data;
  }
}

class Worker {
  constructor() {
    this.time = 0;
    this.step = null;
  }

  start(step) {
    this.step = step;
  }

  work() {
    if (this.isRunning() && !this.isFinished()) {
      ++this.time;
    }
  }

  isFinished() {
    return this.isRunning() && this.time === this.step.duration();
  }

  isRunning() {
    return this.step !== null;
  }

  reset() {
    this.time = 0;
    this.step = null;
  }
}

class ParallelProcesor {
  constructor() {
    this.time = 0;
    this.workers = [];
    for (let i = 0; i < 5; ++i) {
      this.workers.push(new Worker());
    }
    this.unfinished = null;
    this.running = new Set();
  }

  format(result) {
    return `Parallel run will take ${result}s`;
  }

  process(instruction) {
    this.unfinished = new Map(instruction.steps);
    let wait_for_finished = false;
    while (this.unfinished.size > 0) {
      if (this.resetFinished()) {
        wait_for_finished = false;
      }
      if (!wait_for_finished) {
        let available = findAvailable(this.unfinished);
        for (let step of available) {
          if (!this.running.has(step.id)) {
            if (!this.startJob(step)) {
              break;
            }
          }
        }
        wait_for_finished = true;
      }
      this.work();
    }
    return this.time - 1;
  }

  startJob(step) {
    for (let worker of this.workers) {
      if (!worker.isRunning()) {
        this.running.add(step.id);
        worker.start(step);
        return true;
      }
    }
    return false;
  }

  work() {
    for (let worker of this.workers) {
      worker.work();
    }
    ++this.time;
  }

  resetFinished() {
    let ret = false;
    for (let worker of this.workers) {
      if (worker.isFinished()) {
        this.running.delete(worker.step.id);
        this.unfinished.delete(worker.step.id);
        worker.reset();
        ret = true;
      }
    }
    return ret;
  }
}

const task = require('./task');

const processor1 = new task.Processor(
  (instruction) => instruction.process(),
  (result) => `Instruction finished in order: ${result}`
);

new task.Task(new Parser(),
  null,
  processor1,
  new ParallelProcesor());