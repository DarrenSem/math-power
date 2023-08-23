var calctest = require("./calc.js");
calctest.href = "https://example.com/testing-api?num1=3.x&num2=4&operator=times";
console.log(calctest);
// [Function: calculate] {
//   getFieldsData: [Function: getFieldsData],
//   setFieldsData: [Function: setFieldsData],
//   warnAfterFocus: [Function: warnAfterFocus],
//   output: [Function: output],
//   href: 'https://example.com/testing-api?num1=3.x&num2=4&operator=times'
// }

// (null) = try Node CLI args, if that fails then will attempt querystring
console.log(`calctest(null)`);
console.log( calctest(null) );
// { num1: '3.x', operator: 'times', num2: '4', result: '' }
// { num1: '3.x', operator: 'times', num2: '4', result: 12 }
// 12

console.log(`calctest()`);
console.log( calctest() );
// { num1: '3.x', operator: 'times', num2: '4', result: '' }
// { num1: '3.x', operator: 'times', num2: '4', result: 12 }
// 12

console.log(`calctest({ num1: 7, num2: 6, operator: "times" })`);
console.log( calctest({ num1: 7, num2: 6, operator: "times" }) );
// { num1: 7, operator: 'times', num2: 6, result: '' }
// { num1: 7, operator: 'times', num2: 6, result: 42 }
// 42

console.log(`calctest({ num1: 7, num2: 6, operator: "timey" })`);
console.log( calctest({ num1: 7, num2: 6, operator: "timey" }) );
// { num1: 7, operator: 'timey', num2: 6, result: '' }
// Please select an operator
// undefined

console.log(`calctest({ num1: 7, operator: "timey" })`);
console.log( calctest({ num1: 7, operator: "timey" }) );
// { num1: 7, operator: 'timey', num2: undefined, result: '' }
// Please select an operator
// undefined

console.log(`calctest({ num2: 5, operator: "times" })`);
console.log( calctest({ num2: 5, operator: "times" }) );
// { num1: undefined, operator: 'times', num2: 5, result: '' }
// { num1: undefined, operator: 'times', num2: 5, result: NaN }
// NaN

console.log(`calctest({})`);
console.log( calctest({}) );
// { num1: undefined, operator: undefined, num2: undefined, result: '' }
// Please select an operator
// undefined

console.log(`calctest("num2: 3, operator: minus")`);
console.log( calctest("num2: 3, operator: minus") );
// { num1: 'undefined', operator: 'minus', num2: '3', result: '' }
// { num1: 'undefined', operator: 'minus', num2: '3', result: NaN }
// NaN

console.log(`calctest("num2 4, operator=times")`);
console.log( calctest("num2 4, operator=times") );
// { num1: 'undefined', operator: 'times', num2: '4', result: '' }
// { num1: 'undefined', operator: 'times', num2: '4', result: NaN }
// NaN

console.log(`calctest("5 7 9")`);
console.log( calctest("5 7 9") );
// { num1: '5', operator: '7', num2: '9', result: '' }
// { num1: '5', operator: '7', num2: '9', result: '' }
// Please select an operator
// undefined

console.log(`calctest("5 plus 8")`);
console.log( calctest("5 plus 8") );
// { num1: '5', operator: 'plus', num2: '8', result: '' }
// { num1: '5', operator: 'plus', num2: '8', result: 14 }
// 13

console.log(`calctest("7.1,minus,-11")`);
console.log( calctest("7.1,minus,-11") );
// { num1: '7.1', operator: 'minus', num2: '-11', result: '' }
// { num1: '7.1', operator: 'minus', num2: '-11', result: 18.1 }
// 18.1

console.log(`calctest(" ' ', ' ', ' ' ")`);
console.log( calctest(" ' ', ' ', ' ' ") );
// { num1: '3.x', operator: 'times', num2: '4', result: '' }
// { num1: '3.x', operator: 'times', num2: '4', result: 12 }
// 12

console.log(`calctest([4, "times", 2.5])`);
console.log( calctest([4, "times", 2.5]) );
// { num1: '4', operator: 'times', num2: '2.5', result: '' }
// { num1: '4', operator: 'times', num2: '2.5', result: 10 }
// 10

console.log( calctest("https://example.com/api?num1=3.x&num2=4&operator=times") );
console.log( calctest("?num1=3.x&num2=4&operator=times") );
console.log( calctest("num1=3.x&num2=4&operator=times") );
// { num1: '3.x', operator: 'times', num2: '4', result: '' }
// { num1: '3.x', operator: 'times', num2: '4', result: '' }
// { num1: '3.x', operator: 'times', num2: '4', result: 12 }
// 12
// ^ [all 3 produce same result]



console.log(`calctest("https://example.com/testing-api?num1=3.x&num2=4&operator=to+the+power+of")`);
console.log( calctest("https://example.com/testing-api?num1=3.x&num2=4&operator=to+the+power+of") );
// { num1: '3.x', operator: 'to the power of', num2: '4', result: '' }
// { num1: '3.x', operator: 'to the power of', num2: '4', result: 81 }
// 81

console.log(`calctest("https://example.com/testing-api?num1=3.x&num2=4&operator=to+the%20power%20of")`);
console.log( calctest("https://example.com/testing-api?num1=3.x&num2=4&operator=to+the%20power%20of") );
// { num1: '3.x', operator: 'to the power of', num2: '4', result: '' }
// { num1: '3.x', operator: 'to the power of', num2: '4', result: 81 }
// 81
