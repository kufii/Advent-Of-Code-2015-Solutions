import input from './input';
import { mod, sum } from '../../util';

const parseInput = () =>
  input
    .split('\n')
    .map(line =>
      line
        .match(/([a-z]+) would (gain|lose) (\d+) happiness units by sitting next to ([a-z]+)/iu)
        .slice(1)
    )
    .reduce((acc, [person1, type, number, person2]) => {
      acc[person1] = acc[person1] || {};
      acc[person1][person2] = Number(number) * (type === 'gain' ? 1 : -1);
      return acc;
    }, {});

const getSeatingArrangements = (people, start, paths = [], path = []) => {
  const currentPath = [...path, start || people[0]];
  const unvisited = people.filter(p => !currentPath.includes(p));
  if (!unvisited.length) {
    paths.push(currentPath);
    return paths;
  }
  unvisited.forEach(p => getSeatingArrangements(people, p, paths, currentPath));
  return paths;
};

const getHappiness = (happiness, seating) =>
  seating
    .map(
      (p, i) =>
        (happiness[p][seating[mod(i - 1, seating.length)]] || 0) +
        (happiness[p][seating[mod(i + 1, seating.length)]] || 0)
    )
    .reduce(sum);

const getOptimalHappiness = happiness =>
  Math.max(...getSeatingArrangements(Object.keys(happiness)).map(s => getHappiness(happiness, s)));

export default {
  part1: () => {
    const happiness = parseInput();
    return 'Optimal seating results in happiness: ' + getOptimalHappiness(happiness);
  },
  part2: () => {
    const happiness = parseInput();
    happiness.Adrien = {};
    return 'Optimal seating results in happiness, with me added: ' + getOptimalHappiness(happiness);
  }
};
