var Maze = require('./maze.js'),
  Mouse = require('./mouse.js');

class Game {
  constructor(maze, start) {
    this.maze = new Maze(maze, start);
    this.mouse = new Mouse();
  }

  start() {
    console.log('game started');
    while (true) {

    }
  }
}

module.exports = Game;