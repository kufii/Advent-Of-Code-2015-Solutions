import input from './input';
import { isNumber, isString, isArray } from '../../types';
import { sum } from '../../util';

const extractNumbers = (json, ignoreRed) => {
  if (isNumber(json)) return json;
  else if (isString(json)) return 0;
  else if (isArray(json)) return json.map(x => extractNumbers(x, ignoreRed)).reduce(sum);
  const values = Object.values(json);
  return ignoreRed && values.includes('red')
    ? 0
    : values.map(x => extractNumbers(x, ignoreRed)).reduce(sum);
};

export default {
  part1: () => extractNumbers(JSON.parse(input)),
  part2: () => extractNumbers(JSON.parse(input), true)
};
