var Maze = require('./maze.js'),
  Mouse = require('./mouse.js'),
  sleep = require('sleep');

class Game {
  constructor(maze, start) {
    this.maze = new Maze(maze, start);
    this.mouse = new Mouse();
  }

  start() {
    var maze = this.maze,
      mouse = this.mouse;

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

      sleep.usleep(1000000);
      this.print(this.maze);
    }
  }

  print(maze) {
    let mazeHeight = maze.getHeight(),
      mazeWidth = maze.getWidth(),
      matrix = maze.matrix,
      start = maze.start,
      mouse = this.mouse,
      map = '',
      clc = require('cli-color');

    process.stdout.write(clc.move.to(0, 0));

    for (let y = 0; y < mazeHeight; y++) {
      let row = '';
      for (let x = 0; x < mazeWidth; x++) {
        let value = matrix[y][x];
        if (x === start.x && y === start.y) {
          value = clc.red('S');
        } else if (x === mouse.currentPosition.x+start.x && y === mouse.currentPosition.y + start.y) {
          value = clc.greenBright('@');
        } else {
          if (value === 0) {
            value = ' ';
          } else {
            value = '\u2591';
          }
        }

        row += value + '';
      }
      map += row + '\n';
    }

    console.log(map);
  }
}

module.exports = Game;