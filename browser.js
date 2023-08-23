// view.js: defer-loaded after "calc.js"

const qi = id => document.getElementById(id);

const num1El = qi("num1");
const operatorEl = qi("operator");
const num2El = qi("num2");
const resultEl = qi("result");
const calcEl = qi("calc-button");

calculate.getFieldsData = () => {
  const num1 = num1El.value;
  const operator = operatorEl.value;
  const num2 = num2El.value;
  return { num1, operator,num2 };
};

calculate.setFieldsData = (num1, operator, num2) => {
  num1El.value = num1;
  operatorEl.value = operator;
  num2El.value = num2;
};

calculate.warnAfterFocus = message => {
  operatorEl.focus();
  alert(message);
  return; // return undefined
};

calculate.output = result => {
  resultEl.value = result;
  resultEl.focus();
  resultEl.select();
};

calculate.href = location.href.replace(location.hash, "");

const main = (window, setTimeout, delay) => {

  calcEl.onclick = () => calculate();

  // auto-calculate based on getArgsData only (silently skipped if no args passed)
  window.onload = setTimeout( () => {
    calculate(null);
  }, delay );

};

main(window, setTimeout, 100);  // ensure time enough that HTML fields are visible
