const core = require('@actions/core');
const dotenvAction = require('./dotenv_action');

try {
  const dotenvFile = core.getInput('path');
  const logVariables = core.getInput('log-variables').toLowerCase();
  const maskVariables = core.getInput('mask-variables').toLowerCase();
  const variables = dotenvAction(dotenvFile, logVariables);

  if (maskVariables === 'true') {
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
      const message = `Dotenv has set it's output ${key} to ${value}`;
      core.info(message);
    }
  }
  if (logVariables) {
    writeSummary(variables);
  }
} catch (error) {
  core.setFailed(error.message);
}

function writeSummary(variables) {
  core.summary
    .addHeading('Dotenv Output Action Summary')
    .addText('This is a summary of the outputs generated from the provided .env file')
    .addTable([
      [
        { data: 'Output', header: true },
        { data: 'Value', header: true },
      ],
      ...Object.keys(variables).map((key) => [{ data: key }, { data: variables[key] }]),
    ])
    .write();
}
