const fs = require('fs');
const console = require('console');

let dotenv_action = function (dotenvFile, logVariables) {
  if (!fs.existsSync(dotenvFile)) {
    throw new Error('file does not exist');
  }

  const dotenv = require('dotenv').config({ path: dotenvFile });
  const dotenv_expand = require('dotenv-expand').expand(dotenv);

  const returnedMap = {};
  for (const key in dotenv_expand.parsed) {
    const value = dotenv_expand.parsed[key];
    const lowercase_key = key.toLocaleLowerCase();

    if (value.includes(',')) {
      const splitValues = value.split(',');
      for (let i = 0; i < splitValues.length; i++) {
        const splitValue = splitValues[i].trim();
        returnedMap[`${lowercase_key}_element_${i}`] = splitValue;
      }
    }
    returnedMap[lowercase_key] = value;
  }

  if (logVariables) {
    console.log(returnedMap);
  } else {
    console.log(`loaded ${Object.keys(returnedMap).length} values into the environment`);
  }

  return returnedMap;
};

module.exports = dotenv_action;
