'use strict';

let mazeData = require('./mazeData.js'),
  maze = mazeData.maze,
  mazeHeight = maze.length,
  mazeWidth = maze[0].length,
  start = mazeData.start;

var nextStep = (x, y) => {
  let available = false;

  console.log(x, y, maze[y][x]);

  if (maze[y][x] === 0) {
    if (x === 0 || y === 0 || x === mazeWidth - 1 || y === mazeHeight - 1) {
      console.log('found');
      return false;
    }

    maze[y][x] = 1;
    if (nextStep(x + 1, y)) {
      available = true;
    } else if (nextStep(x, y + 1)) {
      available = true;
    } else if (nextStep(x - 1, y)) {
      available = true;
    } else if (nextStep(x, y - 1)) {
      available = true;
    }
  }

  return available;
};

debugger;
nextStep(start.x, start.y);

console.log('done');