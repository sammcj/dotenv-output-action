const core = require('@actions/core');
const dotenvAction = require('./dotenv_action');
try {
  const dotenvFile = core.getInput('path');
  const logVariables = core.getInput('log-variables').toLowerCase();
  const maskVariables = core.getInput('mask-variables').toLowerCase();
  const variables = dotenvAction(dotenvFile, logVariables);

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
    if (logVariables) {
      core.summary(`Dotenv has set it's output ${key} to ${value}`);
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
