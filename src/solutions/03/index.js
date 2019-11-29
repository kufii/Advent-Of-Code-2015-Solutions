import input from './input';

class Infinite2dGrid {
  constructor(defaultValue) {
    this.grid = {};
    this.default = defaultValue;
  }

  get cells() {
    return Object.entries(this.grid).reduce(
      (acc, [y, row]) => [
        ...acc,
        ...Object.entries(row).map(([x, value]) => ({
          x: Number(x),
          y: Number(y),
          value
        }))
      ],
      []
    );
  }

  getCell(x, y) {
    const row = this.grid[y];
    const value = row && row[x];
    return value == null ? this.default : value;
  }

  setCell(x, y, value) {
    this.grid[y] = this.grid[y] || {};
    this.grid[y][x] = value;
  }
}

const move = (pos, char) => {
  if (char === '^') pos.y -= 1;
  else if (char === 'v') pos.y += 1;
  else if (char === '<') pos.x -= 1;
  else if (char === '>') pos.x += 1;
};

const incrementCell = (grid, { x, y }) => grid.setCell(x, y, grid.getCell(x, y) + 1);

export default {
  part1() {
    const grid = new Infinite2dGrid(0);

    const pos = { x: 0, y: 0 };
    grid.setCell(0, 0, 1);
    [...input].forEach(char => {
      move(pos, char);
      incrementCell(grid, pos);
    });

    return grid.cells.length + ' houses with presents delivered';
  },
  part2() {
    const grid = new Infinite2dGrid(0);

    const santa = { x: 0, y: 0 };
    const robo = { x: 0, y: 0 };
    let isSanta = true;

    grid.setCell(0, 0, 1);
    [...input].forEach(char => {
      const pos = isSanta ? santa : robo;
      isSanta = !isSanta;
      move(pos, char);
      incrementCell(grid, pos);
    });

    return grid.cells.length + ' houses with presents delivered';
  }
};
