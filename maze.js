class Maze {
  constructor(matrix, start) {
    this.matrix = matrix;
    this.currentPosition = start;

    this.mazeHeight = matrix.length;
    this.mazeWidth = matrix[0].length;
  }

  isExit() {
    var currentPosition = this.currentPosition,
      x = currentPosition.x,
      y = currentPosition.y;

    return x === 0 || y === 0 ||
      x === this.mazeWidth - 1 || y === this.mazeHeight - 1;
  }

  isAvailable(direction) {
    var next = this.nextPosition(this.currentPosition, direction);
    return this.matrix[next.y][next.x] === 0;
  }

  nextPosition(currentPosition, direction) {
    var x = currentPosition.x,
      y = currentPosition.y;

    if (direction == 'e') {
      x += 1;
    } else if (direction == 's') {
      y += 1;
    } else if (direction == 'w') {
      x -= 1;
    } else if (direction == 'n') {
      y -= 1;
    }

    return {
      x: x,
      y: y
    };
  }
}

module.exports = Maze;