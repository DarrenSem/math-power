// calc.ts: loaded after defer-loaded "calc.ts"

declare var define: any;
(function(root, factory) {
  typeof define === "function" && define.amd
  ? define([], factory)
  : typeof module === "object" && module.exports
  ? module.exports = factory()
  : (
    root.calculate = factory()
  );
})(typeof self !== "undefined" ? self : globalThis, function() {

  const calculate = (data: CalculateData): number | void => {

    let nodeArgsMock: CalculateData;
    if(typeof data === "string" || Array.isArray(data) ) {
      nodeArgsMock = data;
      data = null;
    };

    if(data === null) {
      data = getArgsData(calculate.href, nodeArgsMock);

      if(data === null) {
        return;
      };
    };

    if(data == null) {
      // default logic if undefined (getArgsData had args to parse, or button was clicked)
      data = calculate.getFieldsData();
    };

    let {
      num1,
      operator,
      num2
    } = data as Fields;

    calculate.setFieldsData(num1, operator, num2);  // for visual consistency if calculate({key:value})

    num1 = parseFloat( String(num1) );
    num2 = parseFloat( String(num2) );

    const operations: { [key: string]: MathFunction } = {
      "to the power of": (num1, num2) => Math.pow(num1, num2),
      "plus": (num1, num2) => num1 + num2,
      "minus": (num1, num2) => num1 - num2,
      "times": (num1, num2) => num1 * num2,
      "divided by": (num1, num2) => num1 / num2,
    };

    const fn: MathFunction = operations[operator];

    if(!fn) {
      return calculate.warnAfterFocus("Please select an operator");
    };

    const result = fn(num1, num2);

    calculate.output(result);

    return result;
  };

  var fieldsMock: Fields = {};

  const getFieldsData = (): CalculateData => {
    return fieldsMock;
  };

  const setFieldsData = (num1, operator, num2): void => {
    fieldsMock.num1 = num1;
    fieldsMock.operator = operator;
    fieldsMock.num2 = num2;

    // delete fieldsMock.result;
    fieldsMock.result = null;

    console.warn(fieldsMock);
  };

  const warnAfterFocus = (message): void => {
      console.error(message);
  };

  const output = (result): void => {
    fieldsMock.result = result;
    console.log(fieldsMock);
  };

  const getArgsData = (href, nodeArgsMock: CalculateData): null | undefined => {

    href = getNodeArgsData(nodeArgsMock) ?? href;

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

  const getNodeArgsData = (nodeArgsMock: CalculateData): string | null => {

    const argv = (
      nodeArgsMock
      ? [nodeArgsMock].flat()
      : typeof process !== "undefined"
      ? process.argv.slice(2)
      : []
    );

    const args = argv.length
    ? argv.join(" ").replace(/[^a-z\d.+%-]/gi, " ").trim()
    : "";

    const hasNamedArgs = /\??\b(num[12]|operator)\s*[:= ]\s*[a-z\d.+%-]/i.test(args);
    const orderedList = args.split(/\s+/);

    let num1, operator, num2;

    if(hasNamedArgs) {
      num1 = args.match( /\bnum1\s*[:= ]\s*([a-z\d.+%-]*)/i )?.[1];
      operator = args.match( /\boperator\s*[:= ]\s*([a-z\d.+%-]*)/i )?.[1];
      num2 = args.match( /\bnum2\s*[:= ]\s*([a-z\d.+%-]*)/i )?.[1];
    } else {
      num1 = orderedList.shift();
      operator = orderedList.shift();
      num2 = orderedList.shift();
    };

    return (
      args.trim().length
      ? `X:?num1=${num1}&operator=${operator}&num2=${num2}`
      : null
    );

  };

  calculate.getFieldsData = getFieldsData;
  calculate.setFieldsData = setFieldsData;
  calculate.warnAfterFocus = warnAfterFocus;
  calculate.output = output;

  calculate.href = "";
  // calculate.href = "https://example.com/api#?num1=3.x&num2=4&operator=times"; // no automatic .replace(location.hash, "");
  // calculate.href = "https://example.com/api?num1=3.x&num2=4&operator=times";

  // calculate.calculate = calculate;  // useless, it seems: calculate.default = calculate;

  return calculate;

} );

// console.log(module.exports);
// [Function: calculate] {
//   getFieldsData: [Function: getFieldsData],
//   setFieldsData: [Function: setFieldsData],
//   warnAfterFocus: [Function: warnAfterFocus],
//   output: [Function: output],
//   href: ''
// }

// const calco = globalThis.calculate || module.exports;
// (null) = try Node CLI args, if that fails then will attempt querystring
// console.log( calco(null) );

