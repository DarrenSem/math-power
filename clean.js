"use strict";

const { exec } = require("child_process");

let PATH;
PATH = "./dist";
// PATH = process.argv[2];  // tbh WAY too dangerous! just update THIS file if other places ever "look" somewhere else!

const ERROR_PREFIX = `ERROR during \`${PATH}\` clean`;

const actionsPipe = (fnErr, fnDone, ...actions) => {

  actions = actions.flat().filter(Boolean);

  if(!actions.length)return;

  const action = actions.shift();
  if("xyzDEBUG_LOG_EACH_ACTION" === "DEBUG_LOG_EACH_ACTION")console.log({action});

  exec( action, (error, stdout, stderr) => {

    if(error)return fnErr(
      ERROR_PREFIX, "[error]\n", error.code || 1, error
    );

    if(stderr)return fnErr(
      ERROR_PREFIX, "[stderr]\n", 1, stderr
    );

    if(stdout.length)console.log(stdout);

    return (
      actions.length
      ? actionsPipe(fnErr, fnDone, actions)
      : fnDone(stdout)
    );

  } );

};

const bashTerminalCheck = () => {
  return new Promise( (resolve, reject) => {
    exec( "ls", (error, stdout, stderr) => resolve(!error) );
  } );
};

bashTerminalCheck().then( isBash => {

  if("xyzDEBUG_LOG_IS_BASH" === "DEBUG_LOG_IS_BASH")console.log({isBash}, "\n");

  actionsPipe(
    (errPrefix = "", errSuffix = "", errCode = 1, errMessage = "") => {
      console.error(errPrefix + errSuffix, errMessage);
      process.exit(errCode);
    },

    (stdout) => console.log(`Root of \`${PATH}\` is now clean`),

    [

      `IF NOT EXIST "${PATH}" ( mkdir "${PATH}" )`,

      isBash
      ? `find "${PATH}" -maxdepth 1 -type f -delete`
      : `DEL /Q "${PATH}/"`,

      // "force a failure exit code",

    ]

  );

} );
