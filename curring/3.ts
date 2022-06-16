const mulPowAdd = (a: number, b: number, c: number) => {
  return (x: number) => {
    return (x * a) ** b + c;
  };
};

const equation = mulPowAdd(3, 2, 1);

// ((5 * 3) ** 2) + 1
console.log(equation(5));

export {};
