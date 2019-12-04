import input from './input';
import { isNumber, isString, isArray } from '../../types';
import { sum } from '../../util';

const extractNumbers = (json, ignoreRed) => {
  if (isNumber(json)) return json;
  else if (isString(json)) return 0;
  const values = isArray(json)
    ? json
    : !(ignoreRed && Object.values(json).includes('red')) && Object.values(json);
  return values ? values.map(x => extractNumbers(x, ignoreRed)).reduce(sum) : 0;
};

export default {
  part1: () => 'Sum of all nums: ' + extractNumbers(JSON.parse(input)),
  part2: () => 'Sum of all nums excluding red: ' + extractNumbers(JSON.parse(input), true)
};
