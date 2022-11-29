const core = require('@actions/core');
const dotenvAction = require('./dotenv_action');
try {
  const dotenvFile = core.getInput('path');
  const logVariables = core.getInput('log-variables').toLowerCase() === 'true';
  const maskVariables = core.getInput('mask-variables').toLowerCase() === 'true';
  const splitArrays = core.getInput('split-arrays').toLowerCase() === 'false';
  const variables = dotenvAction(dotenvFile, logVariables, splitArrays);

  if (maskVariables) {
    for (const key in variables) {
      const value = variables[key];
      core.setSecret(value);
    }
  }

  if (logVariables) {
    console.log(variables);
  } else {
    console.log(`loaded ${Object.keys(variables).length} values into the environment`);
  }

  core.setOutput('generic', 'Outputs are generated from the provided .env file');

  for (const key in variables) {
    const value = variables[key];
    core.setOutput(key, value);
  }
} catch (error) {
  core.setFailed(error.message);
}
