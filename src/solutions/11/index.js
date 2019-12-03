import input from './input';
import { replaceAt, range } from '../../util';

const alphabet = range('a', 'z');
const alphabetPairs = [...Array(alphabet.length - 2)].map(
  (_, i) => alphabet[i] + alphabet[i + 1] + alphabet[i + 2]
);

const increment = str => {
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] !== 'z') {
      return replaceAt(str, i, String.fromCharCode(str.charCodeAt(i) + 1));
    }
    str = replaceAt(str, i, 'a');
  }
  return str;
};

const passwordIsSecure = pass =>
  !pass.match(/[iol]/u) &&
  pass.match(/([a-z])\1.*([a-z])\2/u) &&
  pass.match(new RegExp(`(${alphabetPairs.join('|')})`, 'u'));

const getNextPass = pass => {
  do {
    pass = increment(pass);
  } while (!passwordIsSecure(pass));
  return pass;
};

export default {
  part1: () => "Santa's next password: " + getNextPass(input),
  part2: () => "Santa's next next password: " + getNextPass(getNextPass(input))
};
