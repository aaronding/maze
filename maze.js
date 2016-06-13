'use strict';

let mazeData = require('./mazeData.js'),
  maze = mazeData.maze,
  start = mazeData.start;

var
  isExit = position => {
    return position[0] === 0 || position[1] === 0;
  },
  isAvailable = position => {
    return maze[position[1], position[0]] === 1;
  },
  goUp = ()=> {

  },
  goDown = ()=> {

  },
  goLeft = ()=> {

  },
  goRight = ()=> {

  };

do {

} while ();
while(maze[start[0], start[1]]) {

}