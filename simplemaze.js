const clc = require('cli-color'),
  sleep = require('sleep');

const mazeData = require('./mazeData.js'),
  maze = mazeData.maze,
  mazeHeight = maze.length,
  mazeWidth = maze[0].length,
  start = mazeData.start,
  paths = {};

const nextStep = (x, y) => {
  print(x, y);
  let available = false;

  if (maze[y][x] === 0) {
    paths[x + '-' + y] = { x, y };

    maze[y][x] = 2;
    if (x === 0 || y === 0 || x === mazeWidth - 1 || y === mazeHeight - 1) {
      return false;
    }

    if (maze[y][x+1] !==2 && nextStep(x + 1, y)) {
      available = true;
    } else if (maze[y+1][x] !==2 && nextStep(x, y + 1)) {
      available = true;
    } else if (maze[y][x-1] !==2 && nextStep(x - 1, y)) {
      available = true;
    } else if (maze[y-1][x] !==2 && nextStep(x, y - 1)) {
      available = true;
    }
  }

  return available;
};

const run = () => {
  process.stdout.write(clc.reset);
  nextStep(start.x, start.y);
};

const print = (curX, curY) => {
  if (curY >= mazeHeight || maze[curY][curX] === 1) {
    return;
  }

  let map = '';
  for (let y = 0; y < mazeHeight; y++) {
    let row = '';
    for (let x = 0; x < mazeWidth; x++) {
      let value = maze[y][x];
      if (x === curX && y === curY) {
        value = '@';
      } else if (x === start.x && y === start.y) {
        value = clc.red('S');
      } else {
        if (value === 2 &&
          (x === 0 || y === 0 || x === mazeWidth - 1 || y === mazeHeight - 1)) {
          value = clc.green('X');
        } else if (value === 1) {
          value = '*';
        } else {
          value = ' ';
        }
      }

      row += value + ' ';
    }
    map += row + '\n';
  }

  process.stdout.write(clc.move.to(0, 0));
  console.log('current position: ' + curX + '-' + curY + '   ');
  console.log(map);
  sleep.usleep(1000000);
};

run();
