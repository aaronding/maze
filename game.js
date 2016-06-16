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

    while (true) {
      mouse.check(maze.getAvailableDirections());

      let direction = mouse.nextStep();

      if (direction) {
        console.log('===== go   ' + direction)
        mouse.go(direction);
        maze.changePosition(direction);

        if (maze.isExit()) {
          break;
        }
      } else {
        direction = mouse.back();
        console.log('===== back ' + direction);
        if (direction) {
          maze.changePosition(direction);
        } else {
          break;
        }
      }

      sleep.usleep(1000000);
      maze.print();
    }
  }
}

module.exports = Game;