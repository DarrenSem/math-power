// querystring urls.test.ts
"use strict";
module.exports = function (test) {
    var calcqs = require("../dist/calc.js");
    console.log("???");
    // console.log(calculate);
    // console.log(calctest);
    console.log(calcqs);
    test.it("Returns correct numeric answer if provided [partial] URL whose querystring contains both numbers with valid operator", function (assert, _) {
        console.log("calcqs(\"https://example.com/api?num1=3.x&num2=4&operator=times\")");
        // console.log( calcqs("https://example.com/api?num1=3.x&num2=4&operator=times") );
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: 12 }
        // 12
        // ^ [all 3 produce same result]
        _ = calcqs("https://example.com/api?num1=3.x&num2=4&operator=times");
        assert(_ === 12, "Expected calcqs(\"https://example.com/api?num1=3.x&num2=4&operator=times\") to be |12|, got |".concat(_, "|"));
        console.log("calcqs(\"?num1=3.x&num2=4&operator=times\")");
        // console.log( calcqs("?num1=3.x&num2=4&operator=times") );
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: 12 }
        // 12
        // ^ [all 3 produce same result]
        _ = calcqs("?num1=3.x&num2=4&operator=times");
        assert(_ === 12, "Expected calcqs(\"?num1=3.x&num2=4&operator=times\") to be |12|, got |".concat(_, "|"));
        // console.log( calcqs("num1=3.x&num2=4&operator=times") );
        console.log("calcqs(\"num1=3.x&num2=4&operator=times\")");
        // console.log( calcqs("num1=3.x&num2=4&operator=times") );
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: '' }
        // { num1: '3.x', operator: 'times', num2: '4', result: 12 }
        // 12
        // ^ [all 3 produce same result]
        _ = calcqs("num1=3.x&num2=4&operator=times");
        assert(_ === 12, "Expected calcqs(\"num1=3.x&num2=4&operator=times\") to be |12|, got |".concat(_, "|"));
        console.log("calcqs(\"https://example.com/testing-api?num1=3.x&num2=4&operator=to+the+power+of\")");
        // console.log( calcqs("https://example.com/testing-api?num1=3.x&num2=4&operator=to+the+power+of") );
        // { num1: '3.x', operator: 'to the power of', num2: '4', result: '' }
        // { num1: '3.x', operator: 'to the power of', num2: '4', result: 81 }
        // 81
        _ = calcqs("https://example.com/testing-api?num1=3.x&num2=4&operator=to+the+power+of");
        assert(_ === 81, "Expected calcqs(\"https://example.com/testing-api?num1=3.x&num2=4&operator=to+the+power+of\") to be |81|, got |".concat(_, "|"));
        console.log("calcqs(\"https://example.com/testing-api?num1=3.x&num2=3&operator=to+the%20power%20of\")");
        console.log(calcqs("https://example.com/testing-api?num1=3.x&num2=3&operator=to+the%20power%20of"));
        // { num1: '3.x', operator: 'to the power of', num2: '3', result: '' }
        // { num1: '3.x', operator: 'to the power of', num2: '3', result: 27 }
        // 27
        _ = calcqs("https://example.com/testing-api?num1=3.x&num2=3&operator=to+the%20power%20of");
        assert(_ === 27, "Expected calcqs(\"https://example.com/testing-api?num1=3.x&num2=3&operator=to+the%20power%20of\") to be |27|, got |".concat(_, "|"));
    });
};
//# sourceMappingURL=querystring%20urls.test.js.map