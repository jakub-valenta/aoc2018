class Place {
  constructor(value, preceding, next) {
    this.value = value;
    if (preceding == null) {
      this.preceding = this;
    } else {
      this.preceding = preceding;
      this.preceding.next = this;
    }
    if (next == null) {
      this.next = this;
    } else {
      this.next = next;
      this.next.preceding = this;
    }
  }

  clockWise(count) {
    let place = this;
    for (let i = 0; i < count; ++i) {
      place = place.next;
    }
    return place;
  }

  counterClockWise(count) {
    let place = this;
    for (let i = 0; i < count; ++i) {
      place = place.preceding;
    }
    return place;
  }

  insert(value) {
    return new Place(value, this, this.next);
  }

  remove() {
    this.preceding.next = this.next;
    this.next.preceding = this.preceding;
    return this.next;
  }


}

class Game {
  constructor() {
    this.players = 0;
    this.marbles = 0;
    this.current = new Place(0);
    this.score = new Map();
  }

  parse(line) {
    const regex = /(\d+) players; last marble is worth (\d+) points/;
    const tokens = line.match(regex);
    this.players = new Number(tokens[1]);
    this.marbles = new Number(tokens[2]);
  }

  play(multiplier) {
    let player = 1;
    const last_marble = this.marbles * multiplier;
    for (let i = 1; i <= last_marble; ++i) {
      if (i % 23 === 0) {
        this.current = this.current.counterClockWise(7);
        let turn_score = i + this.current.value;
        this.current = this.current.remove();
        if (this.score.has(player)) {
          turn_score += this.score.get(player);
        }
        this.score.set(player, turn_score);
      } else {
        this.current = this.current.clockWise(1).insert(i);
      }
      if (player < this.players) {
        ++player;
      } else {
        player = 1;
      }
    }
    let max = 0;
    for (let [, score] of this.score) {
      if (score > max) {
        max = score;
      }
    }
    return max;
  }

  getData() {
    return this;
  }
}

const task = require('./task');

const processor1 = new task.Processor(
  (game) => game.play(1),
  (score) => `Winning score: ${score}`
);

const processor2 = new task.Processor(
  (game) => game.play(100),
  (score) => `Winning score 100 times larger: ${score}`
);

new task.Task(new Game(), null, processor1, processor2).run();