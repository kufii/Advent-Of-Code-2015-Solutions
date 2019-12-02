import input from './input';
import md5 from 'md5';

const run = numZeros =>
  function*() {
    let hash = '';
    let n = 0;
    do {
      n++;
      hash = md5(input + n);
      if (n % 1000 === 0) yield `tried ${n} hashes`;
    } while (!hash.startsWith('0'.repeat(numZeros)));
    yield `${n} results in hash ${hash}`;
  };

export default {
  part1: () => run(5),
  part2: () => run(6)
};
