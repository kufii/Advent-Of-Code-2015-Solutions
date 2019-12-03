import input from './input';

export class InfiniteGrid {
  constructor(fill) {
    this.fill = fill;
    this.grid = new Map();
  }

  get cells() {
    return [...this.grid.entries()]
      .map(([pos, value]) => [...pos.split(',').map(Number), value])
      .map(([x, y, value]) => ({ x, y, value }));
  }

  key(x, y) {
    return `${x},${y}`;
  }

  set(x, y, value) {
    this.grid.set(this.key(x, y), value);
  }

  get(x, y) {
    return this.grid.has(this.key(x, y)) ? this.grid.get(this.key(x, y)) : this.fill;
  }
}

const move = (pos, char) => {
  if (char === '^') pos.y -= 1;
  else if (char === 'v') pos.y += 1;
  else if (char === '<') pos.x -= 1;
  else if (char === '>') pos.x += 1;
};

const incrementCell = (grid, { x, y }) => grid.set(x, y, grid.get(x, y) + 1);

export default {
  part1() {
    const grid = new InfiniteGrid(0);

    const pos = { x: 0, y: 0 };
    grid.set(0, 0, 1);
    [...input].forEach(char => {
      move(pos, char);
      incrementCell(grid, pos);
    });

    return grid.cells.length + ' houses with presents delivered';
  },
  part2() {
    const grid = new InfiniteGrid(0);

    const santa = { x: 0, y: 0 };
    const robo = { x: 0, y: 0 };

    grid.set(0, 0, 1);
    [...input].forEach((char, index) => {
      const pos = index % 2 === 0 ? santa : robo;
      move(pos, char);
      incrementCell(grid, pos);
    });

    return grid.cells.length + ' houses with presents delivered';
  }
};
