const Maze = require('../maze.js');

describe('Maze basics', () => {
  const matrix = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 1],
  ];
  const start = { x: 1, y: 1 };
  const maze = new Maze(matrix, start);

  test('dimensions', () => {
    expect(maze.getWidth()).toBe(3);
    expect(maze.getHeight()).toBe(3);
  });

  test('available directions from start', () => {
    const dirs = maze.getAvailableDirections({ x: 0, y: 0 });
    expect(dirs.sort()).toEqual(['e', 's']);
  });

  test('detects exit when at border', () => {
    // Relative move to the right border from start
    expect(maze.isExit({ x: 1, y: 0 })).toBe(true);
    // Center is not an exit
    expect(maze.isExit({ x: 0, y: 0 })).toBe(false);
  });
});

