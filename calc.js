// calc.js: loaded after defer-loaded "calc.js"

(function(root, factory) {
  typeof define === "function" && define.amd
  ? define([], factory)
  : typeof module === "object" && module.exports
  ? module.exports = factory()
  : (
    root.calculate = factory()
  );
})(typeof self !== "undefined" ? self : globalThis, function() {

  const calculate = data => {

    if(data === null) {
      data = getArgsData(calculate.href);

      if(data === null) {
        return;
      };
    };

    if(data == null) {
      // default logic if undefined (getArgsData had args to parse, or button was clicked)
      data = calculate.getFieldsData();
    };

    let {num1, operator, num2} = data;

    calculate.setFieldsData(num1, operator, num2);  // for visual consistency if calculate({key:value})

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    const operations = {
      "to the power of": (num1, num2) => Math.pow(num1, num2),
      "plus": (num1, num2) => num1 + num2,
      "minus": (num1, num2) => num1 - num2,
      "times": (num1, num2) => num1 * num2,
      "divided by": (num1, num2) => num1 / num2,
    };

    const fn = operations[operator];

    if(!fn) {
      return calculate.warnAfterFocus("Please select an operator")
    };

    const result = fn(num1, num2);

    calculate.output(result);

    return result;
  };

  var fieldsMock = {};

  const getFieldsData = () => {
    return fieldsMock;
  };

  const setFieldsData = (num1, operator, num2) => {
    fieldsMock.num1 = num1;
    fieldsMock.num2 = num2;
    fieldsMock.operator = operator;

    fieldsMock.result = "";
    // delete fieldsMock.result;

    console.warn(fieldsMock);
  };

  const warnAfterFocus = message => {
      console.error(message);
      return; // return undefined
  };

  const output = result => {
    fieldsMock.result = result;
    console.log(fieldsMock);
  };

  const getArgsData = href => {

    if(!/\?/.test(href))return null;

    // new URL(href), because new URLSearchParams(href) seems to skip the 1st param immediately after "?"
    const p = new URL(href).searchParams;

    calculate.setFieldsData(
      p.get("num1") ?? "",  // briefer than p.has("num1") ? p.get("num1") : ""
      p.get("operator") ?? "",
      p.get("num2") ?? ""
    );

    // return undefined, to ensure getFieldsData parses the values we just moved into the fields
    return;
  };

  calculate.getFieldsData = getFieldsData;
  calculate.setFieldsData = setFieldsData;
  calculate.warnAfterFocus = warnAfterFocus;
  calculate.output = output;

  // calculate.href = "https://example.com/api#?num1=3.x&num2=4&operator=times"; // no automatic .replace(location.hash, "");
  calculate.href = "https://example.com/api?num1=3.x&num2=4&operator=times";

  // calculate.calculate = calculate;  // useless, it seems: calculate.default = calculate;

  return calculate;

} );

// console.log(module.exports);
// // [Function: calculate] {
// //   getFieldsData: [Function: getFieldsData],
// //   setFieldsData: [Function: setFieldsData]
// // }
