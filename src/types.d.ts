type Fields = {
  num1?: number | string,
  operator?: string,
  num2?: number | string,
  result?: number
};

type CalculateData = (
  string | Array<string> | Fields | null | undefined
);

type MathFunction = (...args: number[]) => number;
