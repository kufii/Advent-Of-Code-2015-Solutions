import input from './input';
import { makeArray, sum, nestedLoop, output2dArray, fastMax } from '../../util';

const parseInput = () =>
  input
    .split('\n')
    .map(str => str.match(/^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/iu).slice(1))
    .map(([cmd, fromX, fromY, toX, toY]) => ({
      cmd,
      from: { x: Number(fromX), y: Number(fromY) },
      to: { x: Number(toX), y: Number(toY) }
    }));

const runCmd = (grid, { cmd, from, to }, turnOnCmd, turnOffCmd, toggleCmd) =>
  [...nestedLoop(2, [from.x, from.y], [to.x, to.y])].forEach(
    ([x, y]) =>
      (grid[y][x] = { 'turn on': turnOnCmd, 'turn off': turnOffCmd, toggle: toggleCmd }[cmd](
        grid[y][x]
      ))
  );

const getLightCell = (n, max) =>
  n === 0 ? '█' : n / max < 0.25 ? '▓' : n / max < 0.5 ? '▒' : n / max < 0.75 ? '░' : ' ';

export default {
  part1: visualize =>
    function*() {
      const grid = makeArray(1000, 1000, '.');
      for (const cmd of parseInput()) {
        runCmd(
          grid,
          cmd,
          () => '#',
          () => '.',
          prev => (prev === '#' ? '.' : '#')
        );
        yield 'Running...';
      }
      yield '# of lights lit: ' +
        grid.flatMap(arr => arr.filter(c => c === '#')).length +
        (visualize ? '\n\n' + output2dArray(grid) : '');
    },
  part2: visualize =>
    function*() {
      const grid = makeArray(1000, 1000, 0);
      for (const cmd of parseInput()) {
        runCmd(
          grid,
          cmd,
          prev => prev + 1,
          prev => Math.max(prev - 1, 0),
          prev => prev + 2
        );
        yield 'Running...';
      }
      const max = fastMax(grid.flat());
      yield 'Total Brightness: ' +
        grid.flat().reduce(sum) +
        (visualize
          ? '\n\n' + output2dArray(grid.map(line => line.map(n => getLightCell(n, max))))
          : '');
    },
  visualize: true
};
