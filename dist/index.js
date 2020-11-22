module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 238:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



function resolveConfiguration(configServerUsername,
                              configServerPassword,
                              applicationId,
                              profile,
                              configServerHost,
                              callback) {
  const {exec} = __webpack_require__(129);
  const path = __webpack_require__(622)
  const tmp = __webpack_require__(522);
  const fs = __webpack_require__(747);
  const os = __webpack_require__(87);
  const newline = os.EOL
  console.assert(process.platform === 'linux' || process.platform === 'darwin')
  const configCliPath = __webpack_require__.ab + "bin/" + process.platform + '/config-client'
  // const tmpObj = tmp.fileSync();
  const filename = process.env.GITHUB_ENV // tmpObj.name
  const cmd = ` ${configCliPath} "${configServerUsername}" "${configServerPassword}" "${applicationId}" ${profile} ${configServerHost} ${filename}  `.trim()
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      return console.log(err)
    }
    console.log(`The length of the file data is ${data.length}`)
    exec(cmd.trim(), (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

    });
  });
}

const core = __webpack_require__(450);
const github = __webpack_require__(177);

try {

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  const configServerUsername = core.getInput('config-server-username')
  const configServerPassword = core.getInput('config-server-password')
  const configServerAppId = core.getInput('config-server-application-id')
  const profile = core.getInput('config-server-profile')
  const configServerUri = core.getInput('config-server-uri')

  console.log(`going to connect to config server ${configServerUri} with user username ${configServerUsername}`)

  function callbackInWhichToProcessTheData(mapOfExportedVariables) {
    for (let prop in mapOfExportedVariables) {
      const value = mapOfExportedVariables[prop];
      core.exportVariable(prop, value)
    }
  }

  resolveConfiguration(configServerUsername, configServerPassword, configServerAppId, profile, configServerUri, callbackInWhichToProcessTheData)

} 
catch (error) {
  core.setFailed(error.message);
}



/***/ }),

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 177:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 522:
/***/ ((module) => {

module.exports = eval("require")("tmp");


/***/ }),

/***/ 129:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");;

/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 87:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(238);
/******/ })()
;