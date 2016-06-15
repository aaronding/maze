'use strict';

var Game = require('./game.js'),
  mazeData = require('./mazeData.js');

console.log('game started');

new Game(mazeData.maze, mazeData.start).start();

console.log('game ended');