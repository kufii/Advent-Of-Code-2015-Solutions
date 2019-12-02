import input from './input';

const getInput = () => input.split('\n');

const isNiceOld = str =>
  str.match(/([aeiou].*){3,}/iu) && str.match(/([a-z])\1/iu) && !str.match(/(ab|cd|pq|xy)/iu);

const isNiceNew = str => str.match(/([a-z][a-z]).*\1/iu) && str.match(/([a-z])[a-z]\1/iu);

export default {
  part1: () => 'Number of nice strings: ' + getInput().filter(isNiceOld).length,
  part2: () => 'Number of nice strings: ' + getInput().filter(isNiceNew).length
};
