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

const equation = [mulThree, powTwo, addOne].reduce(
  function (prevFunc, nextFunc) {
    return function (x) {
      return nextFunc(prevFunc(x));
    };
  },
  (k) => k
);

function compose(...args: any[]) {
  return args.reduce(function (prevFunc, nextFunc) {
    return function (...values: any[]) {
      return nextFunc(prevFunc(...values));
    };
  });
}

// First iteration
// prevFunc(x) : (k) => k, it just returns x
// nextFunc(x) : mulThree
// return? : return function(x) {mulThree((k) => k)(x)) : mulThree(x)}
// calculate : 5*3

// Second iteration
// prevFunc : mulThree(x)
// nextFunc : powTwo
// return? : return function(x) {powTwo(5*3)(x)}
// calculate : (5*3)**2

console.log(equation(5));

export { compose };
