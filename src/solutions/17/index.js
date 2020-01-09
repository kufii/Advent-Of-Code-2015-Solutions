import input from './input';
import { sum, getAllSubsets } from '../../util';

const parseInput = () => input.split('\n').map(Number);

const getAllContainerCombinations = () =>
  getAllSubsets(parseInput()).filter(arr => arr.reduce(sum, 0) === 150);

export default {
  part1: () =>
    '# of container combinations that fit 150 liters of eggnog: ' +
    getAllContainerCombinations().length,
  part2() {
    const combinations = getAllContainerCombinations();
    const minContainers = Math.min(...combinations.map(arr => arr.length));
    return (
      `# of ways to fit 150 litres of eggnog using ${minContainers} containers: ` +
      combinations.filter(arr => arr.length === minContainers).length
    );
  }
};
