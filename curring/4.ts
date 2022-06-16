const mul = (a: number, b: number) => a * b;
const pow = (a: number, b: number) => a ** b;
const add = (a: number, b: number) => a + b;

const mulX = (x: number) => (a: number) => mul(a, x);
const powX = (x: number) => (a: number) => pow(a, x);
const addX = (x: number) => (a: number) => add(a, x);

// Make equation(3, 2, 1)

const mulThree = mulX(3);
const powTwo = powX(2);
const addOne = addX(1);

// quiz!

const equation = function (x: number) {
  return addOne(powTwo(mulThree(x)));
};

console.log(equation(5));
