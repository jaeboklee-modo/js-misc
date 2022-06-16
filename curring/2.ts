const mul = (a: number, b: number) => {
  return a * b;
};

const mulX = (x: number) => {
  return (a: number) => mul(a, x);
};

console.log(mulX(2)(3)); // 6

const mulTwo = mulX(2);
const mulThree = mulX(3);

console.log(mulTwo(5)); // 10
console.log(mulThree(5)); // 15

export {};
