const task = require('./task');

class Point {
  constructor(x, y) {
    this.x = Number(x);
    this.y = Number(y);
  }

  move_by(dx, dy) {
    return new Point(this.x + dx, this.y + dy);
  }

  toString() {
    return `${this.x}x${this.y}`;
  }
}

class Claim {
  constructor(id, position, length, height) {
    this.id = Number(id);
    this.position = position;
    this.length = Number(length);
    this.height = Number(height);
  }

  claim(fabric) {
    for (let dx = 0; dx < this.length; ++dx) {
      for (let dy = 0; dy < this.height; ++dy) {
        fabric.claim(this.position.move_by(dx, dy), this.id);
      }
    }
  }
}

class Fabric {
  constructor() {
    this.fabric = new Map();
    this.claims = new Set();
  }

  claim(point, id) {
    this.claims.add(id);
    const key = point.toString();
    if (!this.fabric.has(key)) {
      this.fabric.set(key, []);
    }
    this.fabric.get(key).push(id);
  }

  count_overlaping() {
    let count = 0;
    for (const [point, ids] of this.fabric) {
      if (ids.length > 1) {
        ++count;
      }
    }
    return count;
  }

  find_intact() {
    if (this.claims.size > 1) {
      for (const [point, ids] of this.fabric) {
        if (ids.length > 1) {
          for (const id of ids) {
            this.claims.delete(id);
          }
        }
      }
    }
    return this.claims.values().next().value;
  }
}

function parser(line) {
  const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
  const tokens = line.match(regex);
  return new Claim(tokens[1], new Point(tokens[2], tokens[3]), tokens[4], tokens[5]);
}

function find_overlaping(claims) {
  const fabric = new Fabric();
  for (const claim of claims) {
    claim.claim(fabric);
  }
  return fabric.count_overlaping();
}

function find_intact(claims) {
  const fabric = new Fabric();
  for (const claim of claims) {
    claim.claim(fabric);
  }
  return fabric.find_intact();
}

const processor1 = new task.Processor(
  (claims) => find_overlaping(claims),
  (overlap_size) => `Claims overlap ${overlap_size} square inches`
);

const processor2 = new task.Processor(
  (claims) => find_intact(claims),
  (claim) => `Intact claim id: ${claim}`
);

const instance = new task.Task(parser, parser, processor1, processor2);