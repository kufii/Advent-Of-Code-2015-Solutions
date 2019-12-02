import input from './input';
import { isNumber } from '../../types';

const parseInput = () =>
  input
    .split('\n')
    .map(str => str.split(' -> '))
    .reduce((acc, [cmd, wire]) => ({ ...acc, [wire]: cmd }), {});

const strIsNum = str => str.match(/^\d+$/u);

const uint16 = n => n & 0xffff;

const getWireOutput = (wires, wire) => {
  const recursion = wire => {
    if (isNumber(wires[wire])) return wires[wire];

    const match = wires[wire].match(/^([a-z]+|\d+)? ?(AND|OR|LSHIFT|RSHIFT|NOT)? ?([a-z]+|\d+)?$/u);
    if (!match) return;

    const getValue = param => (strIsNum(param) ? Number(param) : recursion(param));

    const [param1, op, param2] = match.slice(1);
    const value1 = param1 && getValue(param1);
    const value2 = param2 && getValue(param2);
    wires[wire] = uint16(
      !op
        ? value1
        : op === 'NOT'
        ? ~value2
        : op === 'AND'
        ? value1 & value2
        : op === 'OR'
        ? value1 | value2
        : op === 'LSHIFT'
        ? value1 << value2
        : value1 >> value2
    );

    return wires[wire];
  };
  return recursion(wire);
};

export default {
  part1: () => 'Signal of wire "a": ' + getWireOutput(parseInput(), 'a'),
  part2() {
    const wires = parseInput();
    wires.b = getWireOutput(parseInput(), 'a');
    return 'Signal of wire "a" after override: ' + getWireOutput(wires, 'a');
  }
};
