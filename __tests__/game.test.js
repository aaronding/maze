const Game = require('../game.js');
const mazeData = require('../mazeData.js');

const solve = (matrix, start) => {
  const game = new Game(matrix, start, { delay: 0, render: false });
  return game.start().then((exits) => ({ game, exits }));
};

describe('Game solver', () => {
  test('finds the single exit and returns to the start', async () => {
    const matrix = [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
    ];
    const { game, exits } = await solve(matrix, { x: 1, y: 1 });

    expect(exits).toEqual([{ x: 2, y: 0 }]);
    expect(game.mouse.currentPosition).toEqual({ x: 0, y: 0 });
  });

  test('finishes cleanly when there is no exit', async () => {
    const matrix = [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ];
    const { exits } = await solve(matrix, { x: 1, y: 1 });

    expect(exits).toEqual([]);
  });

  test('finds both exits in the bundled maze', async () => {
    const matrix = mazeData.maze.map((row) => row.slice());
    const { exits } = await solve(matrix, mazeData.start);

    expect(exits).toHaveLength(2);
  });

  test('never walks through a wall', async () => {
    const matrix = mazeData.maze.map((row) => row.slice());
    const { game } = await solve(matrix, mazeData.start);
    const { start } = mazeData;

    let pos = { x: 0, y: 0 };
    for (const { type, dir } of game.mouse.traces) {
      const move = type === 'go' ? dir : game.mouse.getOppositeDirection(dir);
      pos = game.mouse.getNextPosition(pos, move);
      expect(matrix[pos.y + start.y][pos.x + start.x]).toBe(0);
    }
  });
});
