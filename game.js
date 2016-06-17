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

    process.stdout.write(clc.reset);
    //process.stdout.write(require('cli-color').move.to(0, 0));

    while (true) {
      let direction = mouse.findNextStep(maze.getAvailableDirections(mouse.currentPosition));

      if (direction) {
        console.log('===== go   ' + direction);
        mouse.go(direction);

        if (maze.isExit(mouse.currentPosition)) {
          mouse.foundExit();
          //break;
        }
      } else {
        direction = mouse.back();
        console.log('===== back ' + direction);
        if (!direction) {
          break;
        }
      }

      sleep.usleep(200000);
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
    for (let y = 0; y < mazeHeight; y++) {
      let row = '';
      for (let x = 0; x < mazeWidth; x++) {
        let value = matrix[y][x];
        if (x === start.x && y === start.y) {
          value = clc.red('S');
        } else if (x === mouse.currentPosition.x+start.x && y === mouse.currentPosition.y + start.y) {
          value = clc.yellow('@');
        } else {
          if (value === 0) {
            value = ' ';
          } else {
            value = '*';
          }
        }

        row += value + ' ';
      }
      map += row + '\n';
    }

    console.log(map);
    process.stdout.write(clc.move.to(0, 0));
  }
}

module.exports = Game;