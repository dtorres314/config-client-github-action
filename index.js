/*
 * This action does a number of things for us:
 *
 * 1. It loads environment variables from Spring Cloud Config Server and loads them into the Github Actions workflow environment
 * 2. It also determines which environment we're in - `PRODUCTION` or `DEVELOPMENT` and exports that as an environment variable, `BP_MODE_LOWERCASE`.
 *
 * TODO
 *
 * 1. figure out how to poll the output of the kubectl command waiting for a config-server instance to appear somewhere
 *
 */

function resolveConfiguration(configServerUsername,
                              configServerPassword,
                              applicationId,
                              profile,
                              configServerHost,
                              callback) {
  const {exec} = require('child_process');
  const path = require('path')
  const tmp = require('tmp');
  const fs = require('fs');
  const os = require('os');
  const newline = os.EOL
  console.assert(process.platform === 'linux' || process.platform === 'darwin')
  const configCliPath = path.join(__dirname, 'bin', process.platform, 'config-client')
  const tmpObj = tmp.fileSync();
  const filename = tmpObj.name
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
      console.log(`stdout:\n${stdout}`);
      fs.readFile(filename, 'utf8', (err, data) => {

        if (err) {
          return console.log(err)
        }

        const m = {}
        const result = data.split(newline)
        result.forEach((line, index, arr) => {
          if (line.trim() === '' || line.indexOf('=') === -1) {

            return
          }
          const parts = line.split('=')
          m[parts [0]] = parts[1]
        })

        callback(m)
      });
    });
  });
}

const core = require('@actions/core');
const github = require('@actions/github');

try {

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // console.log(`The event payload: ${payload}`);
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
      // console.debug('exporting ' + prop);
    }
  }

  resolveConfiguration(configServerUsername, configServerPassword, configServerAppId, profile, configServerUri, callbackInWhichToProcessTheData)

} catch (error) {
  core.setFailed(error.message);
}

