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

  changePosition(direction) {
    var currentPosition = this.currentPosition;
    if (direction == 'e') {
      currentPosition.x += 1;
    } else if (direction == 's') {
      currentPosition.y += 1;
    } else if (direction == 'w') {
      currentPosition.x -= 1;
    } else if (direction == 'n') {
      currentPosition.y -= 1;
    }
  }

  getAvailableDirections() {
    var matrix = this.matrix,
      cur = this.currentPosition,
      x = cur.x,
      y = cur.y,
      ret = {};
    if (matrix[y][x + 1] === 0) {
      ret.e = true;
    } else if (matrix[y + 1][x] === 0) {
      ret.s = true;
    } else if (matrix[y][x - 1] === 0) {
      ret.w = true;
    } else if (matrix[y - 1][x] === 0) {
      ret.n = true;
    }
    return ret;
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