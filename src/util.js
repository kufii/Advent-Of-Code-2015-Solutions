import { isString } from './types';

export const output2dArray = arr => arr.map(line => line.join('')).join('\n');

export const makeArray = (ySize, xSize, fill) => {
  const arr = [];
  for (let y = 0; y < ySize; y++) {
    if (xSize) {
      arr.push([]);
      for (let x = 0; x < xSize; x++) {
        arr[y].push(fill);
      }
    } else {
      arr.push(fill);
    }
  }
  return arr;
};

export const fastMax = arr => arr.reduce((max, v) => (max >= v ? max : v), -Infinity);

export const fastMin = arr => arr.reduce((min, v) => (min <= v ? min : v), Infinity);

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

  get bounds() {
    const cells = this.cells;
    return {
      min: {
        x: fastMin(cells.map(({ x }) => x)),
        y: fastMin(cells.map(({ y }) => y))
      },
      max: {
        x: fastMax(cells.map(({ x }) => x)),
        y: fastMax(cells.map(({ y }) => y))
      }
    };
  }

  toArray(min, max) {
    const bounds = this.bounds;
    if (min == null) min = bounds.min;
    if (max == null) max = bounds.max;
    const array = makeArray(max.y - min.y + 1, max.x - min.x + 1, this.fill);
    for (let y = min.y; y <= max.y; y++) {
      for (let x = min.x; x <= max.x; x++) {
        array[y - min.y][x - min.x] = this.get(x, y);
      }
    }
    return array;
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

  clone() {
    const newGrid = new InfiniteGrid(this.fill);
    newGrid.grid = new Map(this.grid);
    return newGrid;
  }
}

export const sum = (a, b) => a + b;

export const sortNum = (a, b) => a - b;

export const sortBy = (...cbs) => (a, b) => {
  for (const cb of cbs) {
    const aa = cb(a);
    const bb = cb(b);
    const diff = cb.desc
      ? isString(aa)
        ? bb.localeCompare(aa)
        : bb - aa
      : isString(aa)
      ? aa.localeCompare(bb)
      : aa - bb;
    if (diff !== 0) return diff;
  }
  return 0;
};
export const desc = cb => ((cb.desc = true), cb);

export const replaceAt = (str, i, replace) => str.slice(0, i) + replace + str.slice(i + 1);

export const range = (start, stop) => {
  const result = [];
  const numOrCharCode = n => (isString(n) ? n.charCodeAt(0) : n);
  for (let i = numOrCharCode(start); i <= numOrCharCode(stop); i++) {
    result.push(isString(start) ? String.fromCharCode(i) : i);
  }
  return result;
};

export const mod = (n, m) => n - Math.floor(n / m) * m;

export const maxBy = cb => (a, b) => (cb(b) > cb(a) ? b : a);

export const minBy = cb => (a, b) => (cb(b) < cb(a) ? b : a);

export const nestedLoop = function*(n, min, max, filter) {
  const getMin = i => (Array.isArray(min) ? min[i] : min);
  const getMax = i => (Array.isArray(max) ? max[i] : max);

  const arr = [...Array(n)].map((_, i) => getMin(i));
  let i = 0;
  while (true) {
    if (!filter || filter(arr)) yield arr.slice();

    arr[0]++;
    while (arr[i] === getMax(i) + 1) {
      arr[i] = getMin(i);
      i++;
      if (i === n) return;
      arr[i]++;
      if (arr[i] !== getMax(i) + 1) i = 0;
    }
  }
};

export const getAllSubsets = arr =>
  arr.reduce((subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [[]]);
