const { parseArgs } = require('node:util');
const Game = require('./game.js'),
  mazeData = require('./mazeData.js');

const { values } = parseArgs({
  options: { delay: { type: 'string', short: 'd', default: '25' } },
});
const delay = Number(values.delay);
if (!Number.isFinite(delay) || delay < 0) {
  console.error('--delay must be a non-negative number of milliseconds');
  process.exit(1);
}

new Game(mazeData.maze, mazeData.start, { delay }).start().then((exits) => {
  console.log(`Explored the whole maze and found ${exits.length} exit(s).`);
});
