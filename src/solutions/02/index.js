import input from './input';
import { sum, sortNum } from '../../util';

const getInput = () => input.split('\n').map(str => str.split('x').map(Number));

const getSides = ([l, w, h]) => [l * w, w * h, h * l];

export default {
  part1: () =>
    'Wrapping paper needed: ' +
    getInput()
      .map(getSides)
      .map(sides => sides.reduce((a, b) => a + 2 * b, 0) + Math.min(...sides))
      .reduce(sum),
  part2: () =>
    'Ribbon needed: ' +
    getInput()
      .map(dims => dims.sort(sortNum))
      .map(([dim1, dim2, dim3]) => dim1 * 2 + dim2 * 2 + dim1 * dim2 * dim3)
      .reduce(sum)
};
