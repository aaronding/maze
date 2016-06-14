'use strict';

var clc = require('cli-color'),
  mazeData = require('./mazeData.js'),
  maze = mazeData.maze,
  mazeHeight = maze.length,
  mazeWidth = maze[0].length,
  start = mazeData.start,
  paths = {};

var nextStep = (x, y) => {
  let available = false;

  if (maze[y][x] === 0) {
    paths[x + '-' + y] = { x: x, y: y};

    if (x === 0 || y === 0 || x === mazeWidth - 1 || y === mazeHeight - 1) {
      return false;
    }

    maze[y][x] = 2;
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

console.time('step');
nextStep(start.x, start.y);
console.timeEnd('step');

var map = '';
for (let y = 0; y < mazeHeight; y++) {
  let row = '';
  for (let x = 0; x < mazeWidth; x++) {
    let value = maze[y][x];
    if (x === start.x && y === start.y) {
      value = clc.red('S');
    } else {
      if (paths[x + '-' + y]) {
        if (x === 0 || y === 0 || x === mazeWidth - 1 || y === mazeHeight - 1) {
          value = clc.green('X');
        } else {
          value = clc.green('.');
        }
      } else {
        if (value === 2 || value === 0) {
          value = ' ';
        } else {
          value = '*';
        }
      }
    }

    row += value + ' ';
  }
  map += row + '\n';
}

console.log(map);