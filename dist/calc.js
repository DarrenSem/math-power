// calc.js: loaded after defer-loaded "calc.js"
(function (root, factory) {
    typeof define === "function" && define.amd
        ? define([], factory)
        : typeof module === "object" && module.exports
            ? module.exports = factory()
            : (root.calculate = factory());
})(typeof self !== "undefined" ? self : globalThis, function () {
    var calculate = function (data) {
        var nodeArgsMock;
        if (typeof data === "string" || Array.isArray(data)) {
            nodeArgsMock = data;
            data = null;
        }
        ;
        if (data === null) {
            data = getArgsData(calculate.href, nodeArgsMock);
            if (data === null) {
                return;
            }
            ;
        }
        ;
        if (data == null) {
            // default logic if undefined (getArgsData had args to parse, or button was clicked)
            data = calculate.getFieldsData();
        }
        ;
        var _a = data, num1 = _a.num1, operator = _a.operator, num2 = _a.num2;
        calculate.setFieldsData(num1, operator, num2); // for visual consistency if calculate({key:value})
        num1 = parseFloat(String(num1));
        num2 = parseFloat(String(num2));
        var operations = {
            "to the power of": function (num1, num2) { return Math.pow(num1, num2); },
            "plus": function (num1, num2) { return num1 + num2; },
            "minus": function (num1, num2) { return num1 - num2; },
            "times": function (num1, num2) { return num1 * num2; },
            "divided by": function (num1, num2) { return num1 / num2; },
        };
        var fn = operations[operator];
        if (!fn) {
            return calculate.warnAfterFocus("Please select an operator");
        }
        ;
        var result = fn(num1, num2);
        calculate.output(result);
        return result;
    };
    var fieldsMock = {};
    var getFieldsData = function () {
        return fieldsMock;
    };
    var setFieldsData = function (num1, operator, num2) {
        fieldsMock.num1 = num1;
        fieldsMock.operator = operator;
        fieldsMock.num2 = num2;
        // delete fieldsMock.result;
        fieldsMock.result = null;
        console.warn(fieldsMock);
    };
    var warnAfterFocus = function (message) {
        console.error(message);
    };
    var output = function (result) {
        fieldsMock.result = result;
        console.log(fieldsMock);
    };
    var getArgsData = function (href, nodeArgsMock) {
        var _a, _b, _c, _d;
        href = (_a = getNodeArgsData(nodeArgsMock)) !== null && _a !== void 0 ? _a : href;
        if (!/\?/.test(href))
            return null;
        // new URL(href), because new URLSearchParams(href) seems to skip the 1st param immediately after "?"
        var p = new URL(href).searchParams;
        calculate.setFieldsData((_b = p.get("num1")) !== null && _b !== void 0 ? _b : "", // briefer than p.has("num1") ? p.get("num1") : ""
        (_c = p.get("operator")) !== null && _c !== void 0 ? _c : "", (_d = p.get("num2")) !== null && _d !== void 0 ? _d : "");
        // return undefined, to ensure getFieldsData parses the values we just moved into the fields
        return;
    };
    var getNodeArgsData = function (nodeArgsMock) {
        var _a, _b, _c;
        var argv = (nodeArgsMock
            ? [nodeArgsMock].flat()
            : typeof process !== "undefined"
                ? process.argv.slice(2)
                : []);
        var args = argv.length
            ? argv.join(" ").replace(/[^a-z\d.+%-]/gi, " ").trim()
            : "";
        var hasNamedArgs = /\??\b(num[12]|operator)\s*[:= ]\s*[a-z\d.+%-]/i.test(args);
        var orderedList = args.split(/\s+/);
        var num1, operator, num2;
        if (hasNamedArgs) {
            num1 = (_a = args.match(/\bnum1\s*[:= ]\s*([a-z\d.+%-]*)/i)) === null || _a === void 0 ? void 0 : _a[1];
            operator = (_b = args.match(/\boperator\s*[:= ]\s*([a-z\d.+%-]*)/i)) === null || _b === void 0 ? void 0 : _b[1];
            num2 = (_c = args.match(/\bnum2\s*[:= ]\s*([a-z\d.+%-]*)/i)) === null || _c === void 0 ? void 0 : _c[1];
        }
        else {
            num1 = orderedList.shift();
            operator = orderedList.shift();
            num2 = orderedList.shift();
        }
        ;
        return (args.trim().length
            ? "X:?num1=".concat(num1, "&operator=").concat(operator, "&num2=").concat(num2)
            : null);
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
});
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
//# sourceMappingURL=calc.js.map