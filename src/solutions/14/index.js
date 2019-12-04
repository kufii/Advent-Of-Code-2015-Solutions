import input from './input';
import dedent from 'dedent';
import { range, maxBy } from '../../util';

const parseInput = () =>
  input
    .split('\n')
    .map(line =>
      line
        .match(
          /([a-z]+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./iu
        )
        .slice(1)
    )
    .map(([name, ...nums]) => [name, ...nums.map(Number)])
    .reduce(
      (acc, [name, speed, duration, rest]) => ({
        ...acc,
        [name]: { speed, duration, rest, points: 0 }
      }),
      {}
    );

const getDistance = ({ speed, duration, rest }, time) =>
  Math.floor(time / (duration + rest)) * duration * speed +
  Math.min(time % (duration + rest), duration) * speed;

export default {
  part1() {
    const { name, distance } = Object.entries(parseInput())
      .map(([name, stats]) => ({ name, distance: getDistance(stats, 2503) }))
      .reduce(maxBy(({ distance }) => distance));
    return `After 2503 seconds ${name} is furthest at: ${distance}`;
  },
  part2: visualize =>
    function*() {
      const reindeer = parseInput();
      const list = Object.entries(reindeer);

      const getWinner = () => list.reduce(maxBy(([name]) => reindeer[name].points))[0];

      for (const time of range(1, 2503)) {
        const distances = list.map(([name, stats]) => ({
          name,
          distance: getDistance(stats, time)
        }));
        const max = Math.max(...distances.map(d => d.distance));
        distances
          .filter(({ distance }) => distance === max)
          .forEach(({ name }) => reindeer[name].points++);

        if (visualize) {
          const winner = getWinner();
          yield dedent`
            Time: ${time}
            ${winner} is currently in the lead with ${reindeer[winner].points} points.
          `;
        }
      }

      const winner = getWinner();
      yield `${winner} wins with ${reindeer[winner].points} points.`;
    },
  visualize: true
};
