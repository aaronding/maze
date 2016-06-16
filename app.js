'use strict';

var Game = require('./game.js'),
  mazeData = require('./mazeData.js');

console.log('game started');

console.time('game ended');

new Game(mazeData.maze, mazeData.start).start();

console.timeEnd('game ended');