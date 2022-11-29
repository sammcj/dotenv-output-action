const core = require('@actions/core');
const dotenvAction = require('./dotenv_action');
try {
  const dotenvFile = core.getInput('path');
  const logVariables = core.getInput('log-variables').toLowerCase() === 'true';
  const maskVariables = core.getInput('mask-variables').toLowerCase() === 'true';
  const splitArrays = core.getInput('split-arrays').toLowerCase() === 'false';
  const variables = dotenvAction(dotenvFile, splitArrays, logVariables);

  if (maskVariables) {
    for (const key in variables) {
      const value = variables[key];
      core.setSecret(value);
    }
  }

  core.setOutput('generic', 'Outputs are generated from the provided .env file');

  for (const key in variables) {
    const value = variables[key];
    core.setOutput(key, value);
  }

  if (splitArrays) {
    const splitArrayKeys = Object.keys(variables).filter((key) => key.includes(','));
    for (const key of splitArrayKeys) {
      core.setOutput(key, variables[key]);
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
