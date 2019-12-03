import input from './input';

const parseInput = () =>
  input
    .split('\n')
    .map(line => line.match(/([a-z]+) to ([a-z]+) = (\d+)/iu).slice(1))
    .reduce((acc, [loc1, loc2, distance]) => {
      if (!acc[loc1]) acc[loc1] = {};
      if (!acc[loc2]) acc[loc2] = {};
      acc[loc1][loc2] = acc[loc2][loc1] = Number(distance);
      return acc;
    }, {});

const getPathsForLocation = (locations, start, paths = [], path = []) => {
  const currentPath = [...path, start];
  const unvisited = locations.filter(l => !currentPath.includes(l));
  if (!unvisited.length) {
    paths.push(currentPath);
    return paths;
  }
  unvisited.forEach(l => getPathsForLocation(locations, l, paths, currentPath));
  return paths;
};

const getPathLength = (distances, path) =>
  path.reduce((a, b, i) => (i === 0 ? 0 : a + distances[path[i - 1]][b]), 0);

const getAllPaths = locations => locations.flatMap(l => getPathsForLocation(locations, l));

export default {
  part1() {
    const distances = parseInput();
    const paths = getAllPaths(Object.keys(distances));
    return 'Shortest route distance: ' + Math.min(...paths.map(p => getPathLength(distances, p)));
  },
  part2() {
    const distances = parseInput();
    const paths = getAllPaths(Object.keys(distances));
    return 'Longest route distance: ' + Math.max(...paths.map(p => getPathLength(distances, p)));
  }
};
