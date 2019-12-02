const fetchInput = () =>
  fetch(
    'https://raw.githubusercontent.com/kufii/Advent-Of-Code-2015-Solutions/master/src/solutions/08/input.txt'
  ).then(r => r.text());

fetchInput().then(console.log);

export default {
  part1: () =>
    fetchInput().then(
      str =>
        str.replace(/\n/gu, '').length -
        str
          .split('\n')
          .map(
            str =>
              str
                .slice(1, str.length - 1)
                .replace(/(?<!\\)(?:(\\\\)*)\\"/gu, '"')
                .replace(/(?<!\\)(?:(\\\\)*)\\x[0-9a-f]"/giu, 'x')
                .replace(/(?<!\\)(?:(\\\\)*)\\\\"/giu, '\\').length
          )
          .reduce((a, b) => a + b)
    )
};
