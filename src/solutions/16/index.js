import input, { message } from './input';

const GREATER_ITEMS = ['cats', 'trees'];
const LESS_ITEMS = ['pomeranians', 'goldfish'];

const parseInput = () =>
  input
    .split('\n')
    .map(line => line.match(/Sue (\d+): (.*)/iu).slice(1))
    .map(([id, items]) => ({
      id: Number(id),
      items: items
        .split(', ')
        .map(i => i.match(/([a-z]+): (\d+)/iu).slice(1))
        .reduce((acc, [type, num]) => ({ ...acc, [type]: Number(num) }), {})
    }));

const parseMessage = () =>
  message
    .split('\n')
    .map(line => line.match(/([a-z]+): (\d)+/iu).slice(1))
    .map(([type, num]) => ({ type, num: Number(num) }));

const getSue = (sues, expected, filter) =>
  sues.find(
    s =>
      !expected
        .filter(({ type }) => s.items[type] != null)
        .some(({ type, num }) => filter(num, s.items[type], type))
  );

export default {
  part1: () =>
    '# of Sue that got the gift: ' +
    getSue(parseInput(), parseMessage(), (expected, actual) => actual !== expected).id,
  part2: () =>
    'Real # of Sue that got the gift: ' +
    getSue(parseInput(), parseMessage(), (expected, actual, type) =>
      GREATER_ITEMS.includes(type)
        ? actual <= expected
        : LESS_ITEMS.includes(type)
        ? actual >= expected
        : actual !== expected
    ).id
};
