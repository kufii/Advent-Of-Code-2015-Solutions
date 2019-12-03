import dedent from 'dedent';
import { sum } from '../../util';

const fetchInput = () =>
  localStorage.getItem('day8.input') ||
  fetch(
    'https://raw.githubusercontent.com/kufii/Advent-Of-Code-2015-Solutions/master/src/solutions/08/input.txt'
  )
    .then(r => r.text())
    .then(text => text.trim())
    .then(text => (localStorage.setItem('day8.input', text), text));

const escapeRegex = '((?<!\\\\)(?:(\\\\\\\\)*))';

const decodeStr = str =>
  str
    .slice(1, str.length - 1)
    .replace(new RegExp(`${escapeRegex}\\\\x[0-9a-f]{2}`, 'giu'), match =>
      match.replace(
        /\\x[0-9a-f]+/iu,
        String.fromCharCode(parseInt(match.slice(match.length - 2), 16))
      )
    )
    .replace(new RegExp(`${escapeRegex}\\\\"`, 'gu'), '$1"')
    .replace(/\\\\/gu, '\\');

const encodeStr = str => JSON.stringify(str);

const getOriginalLength = file => file.replace(/\n/gu, '').length;

export default {
  part1: () =>
    Promise.resolve(fetchInput())
      .then(str => [
        getOriginalLength(str),
        str
          .split('\n')
          .map(str => decodeStr(str).length)
          .reduce(sum)
      ])
      .then(
        ([codeLength, memoryLength]) => dedent`
          Code length: ${codeLength}
          Memory length: ${memoryLength}
          Result: ${codeLength - memoryLength}
        `
      ),
  part2: () =>
    Promise.resolve(fetchInput())
      .then(str => [
        getOriginalLength(str),
        str
          .split('\n')
          .map(str => encodeStr(str).length)
          .reduce(sum)
      ])
      .then(
        ([codeLength, encodeLength]) => dedent`
          Code length: ${codeLength}
          Encoded length: ${encodeLength}
          Result: ${encodeLength - codeLength}
        `
      )
};
