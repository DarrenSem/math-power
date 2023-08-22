var calculate = require("./calc.js");
console.log(calculate);
// [Function: calculate] {
//   getFieldsData: [Function: getFieldsData],
//   setFieldsData: [Function: setFieldsData],
//   output: [Function: output],
//   href: 'https://example.com/api?num1=3.x&num2=4&operator=times'
// }

console.log(`calculate(null)`);
console.log( calculate(null) );
// { num1: '3.x', num2: '4', operator: 'times', result: '' }
// { num1: '3.x', num2: '4', operator: 'times', result: '' }
// { num1: '3.x', num2: '4', operator: 'times', result: 12 }
// 12

console.log(`calculate()`);
console.log( calculate() );
// { num1: '3.x', num2: '4', operator: 'times', result: '' }
// { num1: '3.x', num2: '4', operator: 'times', result: 12 }
// 12

console.log(`calculate({ num1: 7, num2: 6, operator: "times" })`);
console.log( calculate({ num1: 7, num2: 6, operator: "times" }) );
// { num1: 7, num2: 6, operator: 'times', result: '' }
// { num1: 7, num2: 6, operator: 'times', result: 42 }
// 42

console.log(`calculate({ num1: 7, num2: 6, operator: "timey" })`);
console.log( calculate({ num1: 7, num2: 6, operator: "timey" }) );
// { num1: 7, num2: 6, operator: 'timey', result: '' }
// Please select an operator
// undefined

console.log(`calculate({ num1: 7, operator: "timey" })`);
console.log( calculate({ num1: 7, operator: "timey" }) );
// { num1: 7, num2: undefined, operator: 'timey', result: '' }
// Please select an operator
// undefined

console.log(`calculate({ num2: 5, operator: "times" })`);
console.log( calculate({ num2: 5, operator: "times" }) );
// { num1: undefined, num2: 5, operator: 'times', result: '' }
// { num1: undefined, num2: 5, operator: 'times', result: NaN }
// NaN

console.log(`calculate({})`);
console.log( calculate({}) );
// { num1: undefined, num2: undefined, operator: undefined, result: '' }
// Please select an operator
// undefined

