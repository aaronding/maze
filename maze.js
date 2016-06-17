class Maze {
  constructor(matrix, start) {
    this.matrix = matrix;
    this.start = start;

    this.mazeHeight = matrix.length;
    this.mazeWidth = matrix[0].length;
  }

  getWidth() {
    return this.mazeWidth;
  }

  getHeight() {
    return this.mazeHeight;
  }

  isExit(currentPosition) {
    var x = currentPosition.x + this.start.x,
      y = currentPosition.y + this.start.y;

    return x === 0 || y === 0 ||
      x === this.mazeWidth - 1 || y === this.mazeHeight - 1;
  }

  getAvailableDirections(position) {
    var matrix = this.matrix,
      x = this.start.x + position.x,
      y = this.start.y + position.y,
      ret = [];
    if (matrix[y][x + 1] === 0) {
      ret.push('e');
    }
    if (y+1<this.mazeHeight && matrix[y + 1][x] === 0) {
      ret.push('s');
    }
    if (matrix[y][x - 1] === 0) {
      ret.push('w');
    }
    if (y-1>-1 && matrix[y - 1][x] === 0) {
      ret.push('n');
    }
    return ret;
  }
}

module.exports = Maze;