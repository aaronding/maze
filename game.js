var Maze = require('./maze.js'),
  Mouse = require('./mouse.js'),
  EventEmitter = require('events');

class PaintEvent extends EventEmitter { }

class Game {
  constructor(maze, start) {
    this.maze = new Maze(maze, start);
    this.mouse = new Mouse();
  }

  start() {
    let maze = this.maze,
      mouse = this.mouse,
      event = new PaintEvent();

    event.on('repaint', () => this.print());

    process.stdout.write('[2J[0;0H');

    function next(fn) {
      return fn().then(() => {
        return next(fn);
      }, (resolve, reject) => {
        reject();
      });
    }

    next(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let direction = mouse.findNextStep(maze.getAvailableDirections(mouse.currentPosition));

          if (direction) {
            mouse.go(direction);

            if (maze.isExit(mouse.currentPosition)) {
              mouse.foundExit();
            }
          } else {
            direction = mouse.back();
            if (!direction) {
              reject();
            }
          }

          event.emit('repaint');

          resolve();
        }, 1000);
      });
    });
  }

  print() {
    let mouse = this.mouse;
    let lastStep = mouse.getLastStep();
    let map = lastStep.id + ': ' + lastStep.type + ' to ' + lastStep.dir + '      \n';

    map += this.maze.print(mouse.currentPosition.x, mouse.currentPosition.y);

    process.stdout.write('[1;1H');

    console.log(map);
  }
}

module.exports = Game;