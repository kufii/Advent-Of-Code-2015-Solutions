import { isString } from './types';

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

export const sum = (a, b) => a + b;

export const sortNum = (a, b) => a - b;

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
  const arr = Array(n + 1).fill(min);
  arr[n] = 0;
  let i = 0;
  while (!arr[n]) {
    if (!filter || filter(arr)) yield arr.slice(0, n);

    arr[0]++;
    while (arr[i] === max) {
      arr[i] = min;
      i++;
      arr[i]++;
      if (arr[i] !== max) i = 0;
    }
  }
};
