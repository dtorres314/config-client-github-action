/*
 * This action does a number of things for us:
 *
 * 1. It loads environment variables from Spring Cloud Config Server and loads them into the Github Actions workflow environment
 * 2. It also determines which environment we're in - `PRODUCTION` or `DEVELOPMENT` and exports that as an environment variable, `BP_MODE_LOWERCASE`.
 *
 */
const {exec} = require('child_process');
const path = require('path')


// To get the filename
console.log(`Filename is ${__filename}`);

// To get the directory name
console.log(`Directory name is ${__dirname}`);


const configCliPath = path.join(__dirname, 'bin', 'config-client')

console.log(`the path to the binary is ${configCliPath}`)

exec(configCliPath, (error, stdout, stderr) => {



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

function invoke_config_client_cli() {


}

invoke_config_client_cli()


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
