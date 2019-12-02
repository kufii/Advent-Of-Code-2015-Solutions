const fetchInput = fetch('./input.txt')
  .then(r => r.text())
  .then(console.log);

fetchInput();

export default {};
