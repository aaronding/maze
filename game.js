const Maze = require('./maze.js'),
  Mouse = require('./mouse.js');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Game {
  constructor(maze, start, { delay = 25, render = true } = {}) {
    this.maze = new Maze(maze, start);
    this.mouse = new Mouse();
    this.delay = delay;
    this.render = render;
  }

  // Advances the mouse by one move. Returns false once every reachable cell
  // has been explored and the mouse is back at the start.
  step() {
    const mouse = this.mouse;
    const direction = mouse.findNextStep(this.maze.getAvailableDirections(mouse.currentPosition));

    if (direction) {
      mouse.go(direction);
      if (this.maze.isExit(mouse.currentPosition)) {
        mouse.foundExit();
      }
      return true;
    }

    return mouse.back() !== undefined;
  }

  async start() {
    if (this.render) {
      process.stdout.write('\x1b[2J\x1b[0;0H');
    }

    while (this.step()) {
      if (this.render) {
        this.print();
      }
      if (this.delay > 0) {
        await sleep(this.delay);
      }
    }

    return this.mouse.exit;
  }

  print() {
    const { id, type, dir } = this.mouse.getLastStep();

    let map = `${id}: ${type} to ${dir}      \n`;
    map += this.maze.print(this.mouse.currentPosition.x, this.mouse.currentPosition.y);

    process.stdout.write('\x1b[1;1H');
    console.log(map);
  }
}

module.exports = Game;
