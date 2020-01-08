import input from './input';
import { nestedLoop, sum, maxBy } from '../../util';
import dedent from 'dedent';

const parseInput = () =>
  input
    .split('\n')
    .map(line =>
      line
        .match(
          /([a-z]+): capacity (-?[0-9]+), durability (-?[0-9]+), flavor (-?[0-9]+), texture (-?[0-9]+), calories (-?[0-9]+)/iu
        )
        .slice(1)
    )
    .map(([name, ...rest]) => [name, ...rest.map(Number)])
    .map(([name, capacity, durability, flavor, texture, calories]) => ({
      name,
      capacity,
      durability,
      flavor,
      texture,
      calories
    }));

const getScoreForAttribute = (ingredients, amounts, attribute) =>
  Math.max(ingredients.map((ingredient, i) => ingredient[attribute] * amounts[i]).reduce(sum), 0);

const getScore = (ingredients, amounts) =>
  ['capacity', 'durability', 'flavor', 'texture']
    .map(attr => getScoreForAttribute(ingredients, amounts, attr))
    .reduce((a, b) => a * b);

const getHighestScoringSet = (ingredients, filter) =>
  [
    ...nestedLoop(
      ingredients.length,
      1,
      100 - (ingredients.length - 1),
      arr => arr.reduce(sum) === 100 && (!filter || filter(arr))
    )
  ].reduce(maxBy(a => getScore(ingredients, a)));

export default {
  part1() {
    const ingredients = parseInput();
    const amounts = getHighestScoringSet(ingredients);

    return dedent`
      Recipe that results in highest scoring cookie:
      ${amounts.map((n, i) => `${n} ${ingredients[i].name}`).join(', ')}
      Total Score: ${getScore(ingredients, amounts)}
    `;
  },
  part2() {
    const ingredients = parseInput();
    const amounts = getHighestScoringSet(
      ingredients,
      a => getScoreForAttribute(ingredients, a, 'calories') === 500
    );

    return dedent`
      Recipe that results in highest scoring 500 calorie cookie:
      ${amounts.map((n, i) => `${n} ${ingredients[i].name}`).join(', ')}
      Total Score: ${getScore(ingredients, amounts)}
    `;
  }
};
