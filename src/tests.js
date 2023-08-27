// tests.js = simple(-ish) test RUNNER that can be passed modular TESTER = (assert, runner, printer, ...args) =>

"use strict";

if("xyzDEBUG_BROWSER" === "DEBUG_BROWSER") {

  let root = globalThis;

  root.__dirname = ".";

  root.require = (m) => (

  m === "path" ? {
    resolve: (...args) => args.join(""),
    join: (...args) => args.join("/"),
  }

  : m === "fs" ? {
    readdirSync: (filepath) => [ "foo.test.js", "bar.test.js", "no.js", "" ]
  }

  : m.endsWith("foo.test.js") ? (test) => {

    test.it("Adds numbers", (assert) => {
      var added = 3 + 4;

      assert(added === 7, "3 + 4 should be 7, not " + added);
    });

    test.it("Subtracts numbers", (assert) => {
      var subtracted = 7 - 4;

      assert(subtracted === 3, "7 - 4 should be 3, not " + subtracted);
    });

    test.it("Delays something for a while (future, rewrite to allow async?)", (assert) => {
      setTimeout(() => {
        assert(false || true, "That took a couple seconds...");
      }, 1991 - 1991);
    });

    test.it("Delays something with no description (future, again)", (assert) => {
      setTimeout(() => {
        assert(false || true);
      }, 742 - 742);
    });

  }

  : m.endsWith("bar.test.js") ? (test) => {
    console.warn("inside bar.test.js");
  }

  : null
) };

const tester = ( (assert, runner, printer, ...args) => {

  assert ||= ( (actual, ...args) => {
    if(!actual) {
      const message = args.join(" ");
      throw Error(
        message.length ? message
        : `Expected |${actual}| to be truthy`
      );
    };
  } );

  runner ||= ( (tests, printer) => {

    let completed = [0], began, ended, ms;
    console.log(`Tests: ${tests.length}`);

    for(var L = tests.length, i = 0; i < L; i ++) {

      let test = tests[i];
      let {err, name, fn} = test;
      let number = i + 1;

      // console.log(`${number}\t${name}`);

      began = new Date();
      try {
        fn(tester, ...args);
      } catch(e) {
        err = e;
      };
      ended = new Date();

      ms = +ended - began;
      completed.push( [err?.message, `Test #${number} ${name}`, ms, began, ended] );

      // todo: OK, in hindsight I see why "whew.js" used that res() to keep count (ASYNC works then)
      completed[0] ++;

      if(err || completed[0] >= L)break;

    };

    printer(completed, tests);

  } );

  printer ||= ( (completed) => {
    const err = completed.find( (result, i) => i && result[0] );
    if(err)throw Error( `${err[0]}\n    in ${err[1]}` );
    if("xyzDEBUG_PASS" === "DEBUG_PASS")console.log( "completed, [err, name, ms, began, ended] =", JSON.stringify(completed, 0, "\t") );
  } );

  const tests = [];

  assert.it = (name, testMethod, ...args) => {
    tests.push( {
      fn: () => testMethod(assert, ...args),
      name
    } );
  };

  assert.run = () => {
    runner(tests, printer);
  };

  return assert;

})(); // (assert, runner, printer, ...args)

const loader = ( tester, testPath = __dirname, include = /\.test\.js$/, exclude = /^$/, ...args ) => {

  try {

    const path = require("path");

    // console.log( path.resolve(__dirname) );
    // console.log( path.resolve(testPath) );  // __dirname.replace("/src", "/dist")

    const filepaths = require("fs").readdirSync(testPath);

    const files = filepaths.filter(
      filepath => ( !include || include.test(filepath) ) && ( !exclude || !exclude.test(filepath) )
    );

    console.log(`Files: ${files.length}\t${path.resolve(testPath).replace(/\\/g, "/") + "/*.test.js"}`);

    for(var L = files.length, i = 0; i < L; i ++) {

      const file = files[i];
      console.log(`File #${i + 1}:\t${file}`);

      const loadfile = path.join("..", testPath, file).replace(/\\/g, "/");
      const fn = require(loadfile);
      console.log( {loadfile, fn} );

      if(fn) {
        fn(tester, ...args);
      };

    };

    tester.run();

  } catch(e) {
    console.error(e);
    process.exit(1);
  };

};

loader( tester, "./dist" ); // loader( testPath = __dirname, include = /\.test\.js$/, exclude = /^$/ )
