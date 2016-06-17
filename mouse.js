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
      let dir = availableDirections[i];
      let next = this.getNextPosition(this.currentPosition, dir);
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
      dir: direction,
      type: 'go'
    });
  }

  back() {
    let dir = this.history.pop();
    if (dir) {
      this.currentPosition = this.getNextPosition(this.currentPosition, this.getOppositeDirection(dir));
      this.traces.push({
        dir: dir,
        type: 'back'
      });
    }
    return dir;
  }

  foundExit() {
    this.exit.push(this.currentPosition);
  }

  getNextPosition(position, direction) {
    var ret = {
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
    if (direction === 'e') {
      return 'w'
    } else if (direction === 'w') {
      return 'e'
    } else if (direction === 's') {
      return 'n'
    } else if (direction === 'n') {
      return 's'
    }
  }
}

module.exports = Mouse;