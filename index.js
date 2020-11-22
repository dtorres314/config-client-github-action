

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

const core = require('@actions/core');
const github = require('@actions/github');

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

