class Mouse {
  constructor() {
    this.traces = [];
    this.history = [];

    this.currentPosition = {x: 0, y: 0};
    this.visited = ['0-0'];

    this.exit = [];
  }

  findNextStep(availableDirections) {
    for (let i=0; i<availableDirections.length; i++) {
      const dir = availableDirections[i];
      const next = this.getNextPosition(this.currentPosition, dir);
      if (!this.hasVisitied(next)) {
        return dir;
      }
    }
  }

  go(direction) {
    this.currentPosition = this.getNextPosition(this.currentPosition, direction);
    this.visited.push(this.currentPosition.x + '-' + this.currentPosition.y);

    this.history.push(direction);
    this.traces.push({
      id: this.traces.length,
      dir: direction,
      type: 'go'
    });
  }

  back() {
    const dir = this.history.pop();
    if (dir) {
      this.currentPosition = this.getNextPosition(this.currentPosition, this.getOppositeDirection(dir));
      this.traces.push({
        id: this.traces.length,
        dir,
        type: 'back'
      });
    }
    return dir;
  }

  foundExit() {
    this.exit.push(this.currentPosition);
  }

  getNextPosition(position, direction) {
    const ret = {
      x: position.x,
      y: position.y
    };

    if (direction === 'e') {
      ret.x += 1;
    } else if (direction === 'w') {
      ret.x -= 1;
    } else if (direction === 's') {
      ret.y += 1;
    } else if (direction === 'n') {
      ret.y -= 1;
    }

    return ret;
  }

  hasVisitied(position) {
    return this.visited.indexOf(position.x + '-' + position.y) > -1;
  }

  getOppositeDirection(direction) {
    const dir = {
      e: 'w',
      w: 'e',
      s: 'n',
      n: 's'
    };
    return dir[direction]
  }

  getLastStep() {
    return this.traces[this.traces.length - 1];
  }
}

module.exports = Mouse;
