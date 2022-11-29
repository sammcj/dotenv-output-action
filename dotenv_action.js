const fs = require('fs');

let dotenv_action = function (dotenvFile, splitArrays) {
  if (!fs.existsSync(dotenvFile)) {
    throw new Error('file does not exist');
  }

  const dotenv = require('dotenv').config({ path: dotenvFile });
  const dotenv_expand = require('dotenv-expand').expand(dotenv);

  const returnedMap = {};
  for (const key in dotenv_expand.parsed) {
    const value = dotenv_expand.parsed[key];
    const lowercase_key = key.toLocaleLowerCase();

    if (splitArrays && value.includes(',')) {
      const splitValues = value.split(',');
      returnedMap[lowercase_key] = value;
      for (let i = 0; i < splitValues.length; i++) {
        const splitValue = splitValues[i].trim();
        returnedMap[`${lowercase_key}_${i}`] = splitValue;
      }
    } else {
      returnedMap[lowercase_key] = value;
    }
  }

  return returnedMap;
};

module.exports = dotenv_action;
