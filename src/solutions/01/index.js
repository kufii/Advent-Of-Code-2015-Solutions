import input from './input';

export default {
  part1: () => 'Santa is at floor ' + (input.match(/\(/gu).length - input.match(/\)/gu).length),
  part2() {
    let floor = 0;
    return `Position ${[...input].findIndex(c => {
      floor += c === '(' ? 1 : -1;
      return floor === -1;
    }) + 1} causes Santa to enter the basement`;
  }
};
