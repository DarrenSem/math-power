// browser.js: defer-loaded after "calc.js"
var calculate;
var qi = function (id) { return document.getElementById(id); };
var num1El = qi("num1");
var operatorEl = qi("operator");
var num2El = qi("num2");
var resultEl = qi("result");
var calcEl = qi("calc-button");
calculate.getFieldsData = function () {
    var num1 = num1El.value;
    var operator = operatorEl.value;
    var num2 = num2El.value;
    return { num1: num1, operator: operator, num2: num2 };
};
calculate.setFieldsData = function (num1, operator, num2) {
    num1El.value = num1;
    operatorEl.value = operator;
    num2El.value = num2;
};
calculate.warnAfterFocus = function (message) {
    operatorEl.focus();
    alert(message);
};
calculate.output = function (result) {
    resultEl.value = result;
    resultEl.focus();
    resultEl.select();
};
calculate.href = location.href.replace(location.hash, "");
var main = function (window, setTimeout, delay) {
    calcEl.onclick = function () { return calculate(); };
    // auto-calculate based on getArgsData only (silently skipped if no args passed)
    window.onload = setTimeout(function () {
        calculate(null);
    }, delay);
};
main(window, setTimeout, 100); // ensure time enough that HTML fields are visible
//# sourceMappingURL=browser.js.map