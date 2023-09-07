"use strict";

// debugger;
const {calculate} = require("./calculate-aws.js");
// debugger;

calculate.href = "";

// data = getArgsData

var NOOP = () => {};
var getArgsData = NOOP;
calculate.getFieldsData = () => ({});
calculate.setFieldsData = NOOP;
calculate.warnAfterFocus = NOOP;  // although Ideal World = store <reason for failure> inside response.errorMessage 
calculate.output = (result, num1, operator, num2) => {
  var msg = `[${num1}] ${operator} [${num2}] = [${result}]`;
  var now = new Date;
  console.log(`${now.toLocaleTimeString()}\t${now.toDateString()}\tcalculate:\t${msg}`);
  // debugger;
};

// OR export { handler };
// export const handler = async (event) => {
const handler = async event => {
	// debugger;

	const data = { ...event };
	// debugger;

	const { httpMethod: method } = data;
	// debugger;

	// const ok = data.length || data.toString;
	// const statusCode = ok ? 200 : 400;
	// const statusMessage = ok ? "OK" : `Not Ok (${statusCode})`;
	// const bodyMessage = ok ? "BODY PASS" : "BODY FAIL";
	// debugger;

  const safeJSON = value => {
    try {
      return JSON.parse(value);
    } catch(e) {
      return value;
    };
  };

  let values;

  switch(method?.toUpperCase()) {

    case "OPTIONS":
      // console.log("handler:" + method);
      values = {
        headers: { allow: "GET, POST, OPTIONS" },
        statusCode: 201,
        statusMessage: "No Content"
      };
      break;

    case "GET":
      // console.log("handler:" + method);
      values = {
				statusCode: 200,
				statusMessage: "OK",
				body: JSON.stringify(calculate(safeJSON(data.queryStringParameters))),
			};
      break;

    case "POST":
      // console.log("handler:" + method);
      values = {
				statusCode: 200,
				statusMessage: "OK",
				body: JSON.stringify(calculate(safeJSON(data.body))),
			};
      break;

    default:
      // console.log("handler:" + method);
      values = {
        statusCode: 401,
        statusMessage: "Method Not Allowed",
      };
      break;

    };
    // debugger;

	const response = { ...values, [method && "method"]: method };
	// console.log("response:", response);
	// debugger;

	return response;
};



var test_handler = async mockIndex => {

  var qsp1 = JSON.stringify({ num1: 1 });
  var bodyNull = JSON.stringify(null);
  var body3 = JSON.stringify({ num1: 3 });
  var qsTimes = JSON.stringify({ num1: 4, num2: 6.63, operator: "times"});
  var bodyDividedBy = JSON.stringify({ num1: 8, num2: 9, operator: "divided by" });

  var eventMocks = [
		,
		null,
		{},
		{ body: body3 },
		{ httpMethod: "OPTIONS" },
		{ httpMethod: "POST" },

		{ httpMethod: "POST", body: body3 },
		{ httpMethod: "GET", queryStringParameters: qsp1 },
		{ httpMethod: "POST", queryStringParameters: qsp1 },
		{ httpMethod: "GET", queryStringParameters: qsp1, body: body3 },
		{ httpMethod: "POST", queryStringParameters: qsp1, body: body3 },

		{ httpMethod: "GET", queryStringParameters: qsTimes },
		{ httpMethod: "POST", queryStringParameters: qsTimes },
		{ httpMethod: "GET", body: bodyDividedBy },
		{ httpMethod: "POST", body: bodyDividedBy },
		{ httpMethod: "GET", body: qsTimes },

    { httpMethod: "POST", body: qsTimes },
		{ httpMethod: "GET", queryStringParameters: bodyDividedBy },
		{ httpMethod: "POST", queryStringParameters: bodyDividedBy },
	];

	var response = await handler(eventMocks[mockIndex | 0]);

  // console.log("response:", response);
  // console.log("JSON(response):", JSON.stringify(response));
  // debugger;

  var jsonBody = response?.body;
  // console.log("jsonBody:", jsonBody);
  // debugger;

  var result = JSON.parse(jsonBody ?? null);
  // console.log("result:", result);
  // debugger;

  var resultNum = parseFloat(result); // so null becomes NaN, like it would on the browser webpage
  // console.log("resultNum:", resultNum);
  // debugger;

};

console.log([
	// test_handler(0),
	// test_handler(1),
	// test_handler(2),
	// test_handler(3),
	// test_handler(4),
	// test_handler(5),
	// test_handler(6),
	// test_handler(7),
	// test_handler(8),
	// test_handler(9),
	// test_handler(10),
	// test_handler(11), // PASS
	// test_handler(12), // fail ("POST" but data stored in .queryStringParameters -- the wrong property for this method)
	// test_handler(13), // fail ("GET" but data stored in .body -- the wrong property for this method)
	// test_handler(14), // PASS

	test_handler(15), // fail ("GET" but data stored in .body -- the wrong property for this method)
	test_handler(16), // PASS
	test_handler(17), // PASS
	test_handler(18), // fail ("POST" but data stored in .queryStringParameters -- the wrong property for this method)
]);
// debugger;
