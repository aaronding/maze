class Step {
  constructor(availableDirections) {
    this.from = null;
    this.to = null;
    this.availableDirections = availableDirections;
  }
}

class Mouse {
  constructor() {
    this.history = [];
    this.history.push(new Step());
  }

  getCurrentStep() {
    return this.history[this.history.length - 1];
  }

  check(availableDirections) {
    var step = this.getCurrentStep();
    if (!step.availableDirections) {
      step.availableDirections = availableDirections;
    }
  }

  nextStep() {
    var step = this.getCurrentStep(),
      directions = step.availableDirections,
      direction;
    for (let dir in directions) {
      if (directions[dir] && dir !== step.from) {
        directions[dir] = false;
        direction = dir;
        break;
      }
    }
    return direction;
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

  go(direction) {
    var step = this.getCurrentStep();
    step.to = direction;

    let nextStep = new Step();
    nextStep.from = this.getOppositeDirection(direction);
    this.history.push(nextStep);
  }

  back() {
    let step = this.history.pop();
    return step.from;
  }
}

module.exports = Mouse;