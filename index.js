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
const {exec} = require('child_process');
const path = require('path')
const tmp = require('tmp');
const fs = require('fs');


// To get the filename
console.log(`Filename is ${__filename}`);

// To get the directory name
console.log(`Directory name is ${__dirname}`);


const configCliPath = path.join(__dirname, 'bin', 'config-client')

console.log(`the path to the binary is ${configCliPath}`)

const configServerUsername = ''
const configServerPassword = ''
const configServerEnv = 'deployment'
const bpMode = 'development'
const configServerHost = '35.193.213.137'

const tmpObj = tmp.fileSync();
console.log('File: ', tmpObj.name);
console.log('File descriptor: ', tmpObj.fd);
const filename = tmpObj.name


const cmd = ` ${configCliPath} ${configServerUsername} ${configServerPassword} ${configServerEnv} ${bpMode} ${configServerHost} ${filename}`.trim()

console.log('the command is [' + cmd + ']');

/*
  config-client $CONFIGURATION_SERVER_USERNAME $CONFIGURATION_SERVER_PASSWORD deployment $BP_MODE_LOWERCASE http://${IP_OF_CONFIG_SERVER} $GITHUB_ENV
*/

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
});

fs.readFile(filename, 'utf8', (err, data) => {

  if (err) return console.log(err)

  console.log(`the length of the file data is ${data.length}`)

});


/*

const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello  ${nameToGreet} @ latest!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
}
catch (error) {
  core.setFailed(error.message);
}
*/
