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
    step.availableDirections = availableDirections;
  }

  nextStep() {
    var step = this.getCurrentStep(),
      directions = step.availableDirections,
      direction;
    for (direction in directions) {
      if (directions[direction] && direction !== this.from) {
        directions[direction] = false;
        break;
      }
    }
    return direction;
  }

  go(direction) {
    var step = this.getCurrentStep();
    step.to = direction;

    let nextStep = new Step();
    nextStep.from = direction;
    this.history.push(nextStep);
  }

  back() {

  }
}

module.exports = Mouse;