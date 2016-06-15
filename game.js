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
        mouse.go(direction);
        maze.changePosition(direction);

        console.log('===== go')
      } else {

        console.log('===== back ')
        direction = mouse.back();
        if (direction) {
          maze.changePosition(direction);
        } else {
          break;
        }
      }

      console.log('=====')
      sleep.usleep(100000);
    }
  }
}

module.exports = Game;