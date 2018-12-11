class Parser {
  constructor() {
    this.guards = new Map();
    this.current_guard = null;
    this.fell_asleep = null;
  }

  parse(line) {
    const tokens = line.match(/\[\d\d\d\d-\d\d-\d\d (\d\d):(\d\d)\] (.+)/);
    const hour = Number(tokens[1]);
    const minute = Number(tokens[2]);
    const msg = tokens[3];
    switch (msg.charAt(0)) {
      case 'f':
        {
          this.fell_asleep = [minute, hour];
          break;
        }
      case 'w':
        {
          if (this.fell_asleep[1] === 0 || hour === 0) {
            this.current_guard.sleep(this.fell_asleep[1] === 0 ? this.fell_asleep[0] : 0, hour === 0 ? minute : 60);
          }
          this.fell_asleep = null;
          break;
        }
      default:
        {
          const guard_id = msg.match(/Guard #(\d+) begins shift/)[1];
          if (!this.guards.has(guard_id)) {
            this.guards.set(guard_id, new Guard(guard_id));
          }
          this.current_guard = this.guards.get(guard_id);
          this.fell_asleep = null;
          break;
        }
    }
  }

  getData() {
    return this.guards;
  }
}

class Guard {
  constructor(id) {
    this.id = id;
    this.sleeping = Array(60).fill(0);
  }

  sleep(fall_asleep, wake_up) {
    for (let i = fall_asleep; i < wake_up; ++i) {
      ++this.sleeping[i];
    }
  }

  totalSlept() {
    return this.sleeping.reduce((acc, val) => acc + val, 0);
  }

  mostTimesSlept() {
    return this.sleeping.reduce((acc, val) => acc > val ? acc : val, 0);
  }

  mostTimesSleptMinute() {
    let max = -1;
    let minute = -1;
    for (let i = 0; i < this.sleeping.length; ++i) {
      if (max < this.sleeping[i]) {
        max = this.sleeping[i];
        minute = i;
      }
    }
    return minute;
  }
}

function findMostSleeping1(guards) {
  let most_sleeping_guard = guards.values().next().value;
  for (const [id, guard] of guards) {
    if (guard.totalSlept() > most_sleeping_guard.totalSlept()) {
      most_sleeping_guard = guard;
    }
  }
  return most_sleeping_guard.mostTimesSleptMinute() * most_sleeping_guard.id;
}

function findMostSleeping2(guards) {
  let most_sleeping_guard = guards.values().next().value;
  for (const [id, guard] of guards) {
    if (guard.mostTimesSlept() > most_sleeping_guard.mostTimesSlept()) {
      most_sleeping_guard = guard;
    }
  }
  return most_sleeping_guard.mostTimesSleptMinute() * most_sleeping_guard.id;
}

const task = require('./task');

const processor1 = new task.Processor(
  findMostSleeping1,
  (x) => `Most sleeping index: ${x}`
);

const processor2 = new task.Processor(
  findMostSleeping2,
  (x) => `Most sleeping index2: ${x}`
);

const instance = new task.Task(
  new Parser(),
  null,
  processor1,
  processor2);