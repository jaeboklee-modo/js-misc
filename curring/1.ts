const mul = (a: number, b: number) => {
  return a * b;
};

const mulTwo = (a: number) => {
  return mul(a, 2);
};
const mulThree = (a: number) => {
  return mul(a, 3);
};

console.log(mulTwo(5)); // 10
console.log(mulThree(5)); // 15
