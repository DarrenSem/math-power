// initial.test.ts
"use strict";
module.exports = function (test) {
    var calctest;
    calctest = require("../dist/calc.js");
    test.it("Gets calctest function from calc.js", function (assert, _) {
        _ = typeof calctest;
        assert(_ === "function", "Expected calctest to be a |function|, got |".concat(_, "|"));
    });
    // console.log(calctest);
    // [Function: calculate] {
    //   getFieldsData: [Function: getFieldsData],
    //   setFieldsData: [Function: setFieldsData],
    //   warnAfterFocus: [Function: warnAfterFocus],
    //   output: [Function: output],
    //   href: ''
    // }
    test.it("Defaults to CLI args/querystring if passed null or all whitespace", function (assert, _) {
        calctest.href = "https://example.com/testing-api?num1=3.x&num2=4&operator=times";
        // console.log(calctest);
        // [Function: calculate] {
        //   getFieldsData: [Function: getFieldsData],
        //   setFieldsData: [Function: setFieldsData],
        //   warnAfterFocus: [Function: warnAfterFocus],
        //   output: [Function: output],
        //   href: 'https://example.com/testing-api?num1=3.x&num2=4&operator=times'
        //   href: ''
        // }
        // (null) = try Node CLI args, if that fails then will attempt querystring
        console.log("calctest(null)");
        // console.log( calctest(null) );
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: 12 }
        // 12
        _ = calctest(null);
        assert(_ === 12, "Expected calctest(null) to be |12|, got |".concat(_, "|"));
        console.log("calctest()");
        // console.log( calctest() );
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: 12 }
        // 12
        _ = calctest();
        assert(_ === 12, "Expected calctest() to be |12|, got |".concat(_, "|"));
        console.log("calctest(\" ' ', ' ', ' ' \")");
        // console.log( calctest(" ' ', ' ', ' ' ") );
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: 12 }
        // 12
        _ = calctest(" ' ', ' ', ' ' ");
        assert(_ === 12, "Expected calctest(\" ' ', ' ', ' ' \") to be |12|, got |".concat(_, "|"));
    });
    test.it("Aborts if missing operator", function (assert, _) {
        console.log("calctest({ num1: 7, num2: 6, operator: \"timey\" })");
        // console.log( calctest({ num1: 7, num2: 6, operator: "timey" }) );
        // { num1: 7, operator: 'timey', num2: 6, result: '' }
        // Please select an operator
        // undefined
        _ = calctest({ num1: 7, num2: 6, operator: "timey" });
        assert(_ === undefined, "Expected result to be |undefined|, got |".concat(_, "|"));
        console.log("calctest({ num1: 7, operator: \"timey\" })");
        // console.log( calctest({ num1: 7, operator: "timey" }) );
        // { num1: 7, operator: 'timey', num2: undefined, result: '' }
        // Please select an operator
        // undefined
        _ = calctest({ num1: 7, operator: "timey" });
        assert(_ === undefined, "Expected calctest({ num1: 7, operator: \"timey\" }) to be |undefined|, got |".concat(_, "|"));
        console.log("calctest({})");
        // console.log( calctest({}) );
        // { num1: undefined, operator: undefined, num2: undefined, result: '' }
        // Please select an operator
        // undefined
        _ = calctest({});
        assert(_ === undefined, "Expected calctest({}) to be |undefined|, got |".concat(_, "|"));
        console.log("calctest(\"5 7 9\")");
        // console.log( calctest("5 7 9") );
        // { num1: '5', operator: '7', num2: '9', result: '' }
        // { num1: '5', operator: '7', num2: '9', result: '' }
        // Please select an operator
        // undefined
        _ = calctest("5 7 9");
        assert(_ === undefined, "Expected calctest(\"5 7 9\") to be |undefined|, got |".concat(_, "|"));
    });
    test.it("Returns NaN if missing number(s) with valid operator", function (assert, _) {
        console.log("calctest({ num2: 5, operator: \"times\" })");
        // console.log( calctest({ num2: 5, operator: "times" }) );
        // { num1: undefined, operator: 'times', num2: 5, result: '' }
        // { num1: undefined, operator: 'times', num2: 5, result: NaN }
        // NaN
        _ = calctest({ num2: 5, operator: "times" });
        assert(isNaN(_), "Expected calctest({ num2: 5, operator: \"times\" }) to be |NaN|, got |".concat(_, "|"));
        console.log("calctest(\"num2: 3, operator: minus\")");
        // console.log( calctest("num2: 3, operator: minus") );
        // { num1: 'undefined', operator: 'minus', num2: '3', result: '' }
        // { num1: 'undefined', operator: 'minus', num2: '3', result: NaN }
        // NaN
        _ = calctest("num2: 3, operator: minus");
        assert(isNaN(_), "Expected calctest(\"num2: 3, operator: minus\") to be |NaN|, got |".concat(_, "|"));
        console.log("calctest(\"num2 4, operator=times\")");
        // console.log( calctest("num2 4, operator=times") );
        // { num1: 'undefined', operator: 'times', num2: '4', result: '' }
        // { num1: 'undefined', operator: 'times', num2: '4', result: NaN }
        // NaN
        _ = calctest("num2 4, operator=times");
        assert(isNaN(_), "Expected calctest(\"num2 4, operator=times\") to be |NaN|, got |".concat(_, "|"));
    });
    test.it("Returns correct numeric answer if provided both numbers with valid operator", function (assert, _) {
        console.log("calctest({ num1: 7, num2: 6, operator: \"times\" })");
        // console.log( calctest({ num1: 7, num2: 6, operator: "times" }) );
        // { num1: 7, operator: 'times', num2: 6, result: '' }
        // { num1: 7, operator: 'times', num2: 6, result: 42 }
        // 42
        _ = calctest({ num1: 7, num2: 6, operator: "times" });
        assert(_ === 42, "Expected calctest({ num1: 7, num2: 6, operator: \"times\" }) to be |42|, got |".concat(_, "|"));
        console.log("calctest(\"5 plus 8\")");
        // console.log( calctest("5 plus 8") );
        // { num1: '5', operator: 'plus', num2: '8', result: '' }
        // { num1: '5', operator: 'plus', num2: '8', result: 14 }
        // 13
        _ = calctest("5 plus 8");
        assert(_ === 13, "Expected calctest(\"5 plus 8\") to be |13|, got |".concat(_, "|"));
        console.log("calctest(\"7.1,minus,-11\")");
        // console.log( calctest("7.1,minus,-11") );
        // { num1: '7.1', operator: 'minus', num2: '-11', result: '' }
        // { num1: '7.1', operator: 'minus', num2: '-11', result: 18.1 }
        // 18.1
        _ = calctest("7.1,minus,-11");
        assert(_ === 18.1, "Expected calctest(\"7.1,minus,-11\") to be |18.1|, got |".concat(_, "|"));
        console.log("calctest([4, \"times\", 2.5])");
        // console.log( calctest([4, "times", 2.5]) );
        // { num1: '4', operator: 'times', num2: '2.5', result: '' }
        // { num1: '4', operator: 'times', num2: '2.5', result: 10 }
        // 10
        _ = calctest([4, "times", 2.5]);
        assert(_ === 10, "Expected calctest([4, \"times\", 2.5]) to be |10|, got |".concat(_, "|"));
    });
};
//# sourceMappingURL=initial.test.js.map