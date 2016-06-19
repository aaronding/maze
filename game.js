var Maze = require('./maze.js'),
  Mouse = require('./mouse.js'),
  EventEmitter = require('events');
  sleep = require('sleep');

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

    process.stdout.write(require('cli-color').reset);
    //process.stdout.write(require('cli-color').move.to(0, 0));

    while (true) {
      let direction = mouse.findNextStep(maze.getAvailableDirections(mouse.currentPosition));

      if (direction) {
        mouse.go(direction);

        if (maze.isExit(mouse.currentPosition)) {
          mouse.foundExit();
        }
      } else {
        direction = mouse.back();
        if (!direction) {
          break;
        }
      }

      sleep.usleep(100000);
      event.emit('repaint');
    }
  }

  print() {
    let maze = this.maze,
      mazeHeight = maze.getHeight(),
      mazeWidth = maze.getWidth(),
      matrix = maze.matrix,
      start = maze.start,
      mouse = this.mouse,
      map = '',
      clc = require('cli-color');

    process.stdout.write(clc.move.to(0, 0));

    let lastStep = mouse.getLastStep();
    map = lastStep.id + ': ' + lastStep.type + ' to ' + lastStep.dir + '\n';
    for (let y = 0; y < mazeHeight; y++) {
      let row = '';
      for (let x = 0; x < mazeWidth; x++) {
        let value = matrix[y][x];
        if (x === start.x && y === start.y) {
          value = clc.red('\u2605 ');
        } else if (x === mouse.currentPosition.x+start.x && y === mouse.currentPosition.y + start.y) {
          value = clc.greenBright('\uD83D\uDC2D ');
        } else {
          if (value === 0) {
            value = '  ';
          } else {
            value = '\u2593\u2593';
          }
        }

        row += value;
      }
      map += row + '\n';
    }

    console.log(map);
  }
}

module.exports = Game;