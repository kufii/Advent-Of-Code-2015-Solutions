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
  if (isString(start)) {
    for (let i = start.charCodeAt(0); i <= stop.charCodeAt(0); i++) {
      result.push(String.fromCharCode(i));
    }
  } else {
    for (let i = start; i <= stop; i++) {
      result.push(i);
    }
  }
  return result;
};

export const mod = (n, m) => ((n % m) + m) % m;
