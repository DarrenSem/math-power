// browser.js: defer-loaded after "calc.js"

var calculate;

const qi = (id): HTMLElement => document.getElementById(id);

const num1El = qi("num1") as HTMLInputElement;
const operatorEl = qi("operator") as HTMLSelectElement;
const num2El = qi("num2") as HTMLInputElement;
const resultEl = qi("result") as HTMLInputElement;
const calcEl = qi("calc-button");

calculate.getFieldsData = (): CalculateData => {
  const num1 = num1El.value;
  const operator = operatorEl.value;
  const num2 = num2El.value;
  return { num1, operator,num2 };
};

calculate.setFieldsData = (num1, operator, num2): void => {
  num1El.value = num1;
  operatorEl.value = operator;
  num2El.value = num2;
};

calculate.warnAfterFocus = (message): void => {
  operatorEl.focus();
  alert(message);
};

calculate.output = (result): void => {
  resultEl.value = result;
  resultEl.focus();
  resultEl.select();
};

calculate.href = location.href.replace(location.hash, "");

const main = (window, setTimeout, delay): void => {

  calcEl.onclick = () => calculate();

  // auto-calculate based on getArgsData only (silently skipped if no args passed)
  window.onload = setTimeout( () => {
    calculate(null);
  }, delay );

};

main(window, setTimeout, 100);  // ensure time enough that HTML fields are visible
