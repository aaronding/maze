class Maze {
  constructor(matrix, start) {
    this.matrix = matrix;
    this.start = start;
    this.currentPosition = {
      x: start.x,
      y: start.y
    };

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
    }
    if (matrix[y + 1][x] === 0) {
      ret.s = true;
    }
    if (matrix[y][x - 1] === 0) {
      ret.w = true;
    }
    if (matrix[y - 1][x] === 0) {
      ret.n = true;
    }
    return ret;
  }

  print() {
    let map = '',
      clc = require('cli-color');
    for (let y = 0; y < this.mazeHeight; y++) {
      let row = '';
      for (let x = 0; x < this.mazeWidth; x++) {
        let value = this.matrix[y][x];
        if (x === this.start.x && y === this.start.y) {
          value = clc.red('S');
        } else if (x === this.currentPosition.x && y === this.currentPosition.y) {
          value = clc.yellow('@');
        } else {
          if (value === 0) {
            value = ' ';
          } else {
            value = '*';
          }
        }

        row += value + ' ';
      }
      map += row + '\n';
    }

    console.log(map);
    process.stdout.write(clc.move.to(0, 0));
  }
}

module.exports = Maze;