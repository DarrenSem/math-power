"use strict";

// via calc.ts and types.d.ts

// type Fields = {
//   num1?: number | string,
//   operator?: string,
//   num2?: number | string,
//   result?: number
// };

// type CalculateData = (
//   string | Array<string> | Fields | null | undefined
// );

// type MathFunction = (...args: number[]) => number;

// const calculate = (data: CalculateData): number | void => {
const calculate = data => {
	// let nodeArgsMock: CalculateData;
	let nodeArgsMock;
	if (typeof data === "string" || Array.isArray(data)) {
		nodeArgsMock = data;
		data = null;
	}

	if (data === null) {
		data = getArgsData(calculate.href, nodeArgsMock);

		if (data === null) {
			return;
		}
	}

	if (data == null) {
		// default logic if undefined (getArgsData had args to parse, or button was clicked)
		data = calculate.getFieldsData();
	}

	let {
		num1,
		operator,
		num2,
		// } = data as Fields;
	} = data;

	calculate.setFieldsData(num1, operator, num2); // for visual consistency if calculate({key:value})

	num1 = parseFloat(String(num1));
	num2 = parseFloat(String(num2));

	// const operations: { [key: string]: MathFunction } = {
	const operations = {
		"to the power of": (num1, num2) => Math.pow(num1, num2),
		plus: (num1, num2) => num1 + num2,
		minus: (num1, num2) => num1 - num2,
		times: (num1, num2) => num1 * num2,
		"divided by": (num1, num2) => num1 / num2,
	};

	// const fn: MathFunction = operations[operator];
	const fn = operations[operator];

	if (!fn) {
		return calculate.warnAfterFocus("Please select an operator");
	}

	const result = fn(num1, num2);

	calculate.output(result, num1, operator, num2);

	return result;
};



// debugger;
if (typeof exports === "object") {
  exports.calculate = calculate;
};
// debugger;
