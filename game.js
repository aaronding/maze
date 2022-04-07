const EventEmitter = require('events');
const Maze = require('./maze.js'),
  Mouse = require('./mouse.js');

class PaintEvent extends EventEmitter { }

function next(fn) {
  return fn().then(() => next(fn), (resolve, reject) => reject());
}

class Game {
  constructor(maze, start) {
    this.maze = new Maze(maze, start);
    this.mouse = new Mouse();

    this.event = new PaintEvent();
    this.event.on('repaint', () => this.print());
  }

  start() {
    process.stdout.write('[2J[0;0H');

    next(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const mouse = this.mouse;
          let direction = mouse.findNextStep(this.maze.getAvailableDirections(mouse.currentPosition));

          if (direction) {
            mouse.go(direction);

            if (this.maze.isExit(mouse.currentPosition)) {
              mouse.foundExit();
            }
          } else {
            direction = mouse.back();
            if (!direction) {
              reject();
            }
          }

          this.event.emit('repaint');

          resolve();
        }, 1000);
      });
    });
  }

  print() {
    const { id, type, dir } = this.mouse.getLastStep();

    let map = `${id}: ${type} to ${dir}      \n`;
    map += this.maze.print(this.mouse.currentPosition.x, this.mouse.currentPosition.y);

    process.stdout.write('[1;1H');
    console.log(map);
  }
}

module.exports = Game;
