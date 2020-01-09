import input from './input';
import { makeArray, sum, nestedLoop } from '../../util';

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

export default {
  part1: () =>
    function*() {
      const grid = makeArray(1000, 1000, false);
      for (const cmd of parseInput()) {
        runCmd(
          grid,
          cmd,
          () => true,
          () => false,
          prev => !prev
        );
        yield 'Running...';
      }
      yield '# of lights lit: ' + grid.flatMap(arr => arr.filter(Boolean)).length;
    },
  part2: () =>
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
      yield 'Total Brightness: ' + grid.flat().reduce(sum);
    }
};
