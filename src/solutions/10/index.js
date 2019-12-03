const input = '1321131112';

const lookAndSay = str => str.replace(/(\d)\1*/gu, match => `${match.length}${match[0]}`);

const run = n =>
  function*() {
    let str = input.slice();
    for (let i = 0; i < n; i++) {
      str = lookAndSay(str);
      yield `${i + 1} times: ${str.length}`;
    }
    yield `Length after ${n} rounds: ` + str.length;
  };

export default {
  part1: () => run(40),
  part2: () => run(50)
};
