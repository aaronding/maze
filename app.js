'use strict';

var Game = require('./game.js'),
  mazeData = require('./mazeData.js');

new Game(mazeData.maze, mazeData.start).start();
