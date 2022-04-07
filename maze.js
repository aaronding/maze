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

  getValue(x, y) {
    return this.matrix[y][x];
  }

  isExit(position) {
    const x = position.x + this.start.x,
      y = position.y + this.start.y;

    return x === 0 || y === 0 ||
      x === this.mazeWidth - 1 || y === this.mazeHeight - 1;
  }

  getAvailableDirections(position) {
    const matrix = this.matrix,
      x = this.start.x + position.x,
      y = this.start.y + position.y,
      ret = [];

    if (matrix[y][x + 1] === 0) {
      ret.push('e');
    }
    if (y+1 < this.mazeHeight && matrix[y + 1][x] === 0) {
      ret.push('s');
    }
    if (matrix[y][x - 1] === 0) {
      ret.push('w');
    }
    if (y-1 > -1 && matrix[y - 1][x] === 0) {
      ret.push('n');
    }

    return ret;
  }

  print(curX, curY) {
    const mazeHeight = this.getHeight(),
      mazeWidth = this.getWidth(),
      start = this.start;

    let map = '';

    for (let y = 0; y < mazeHeight; y++) {
      let row = '';
      for (let x = 0; x < mazeWidth; x++) {
        let value = this.getValue(x, y);
        if (x === start.x && y === start.y) {
          value = '\u2605 ';
        } else if (x === curX + start.x && y === curY + start.y) {
          value = '\uD83D\uDC2D';
        } else {
          if (value === 0) {
            value = '  ';
          } else {
            value = '\u2593\u2593';
          }
        }

        row += value;
      }
      map += row + '\n';
    }
    return map;
  }
}

module.exports = Maze;
