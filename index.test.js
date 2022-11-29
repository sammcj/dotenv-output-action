test('test runs with custom path', () => {
  const dotenv_action = require('./dotenv_action');
  expect(dotenv_action('fixtures/github.env')).toEqual({ fixtures_1: '123' });
});

test('test runs with different path', () => {
  const dotenv_action = require('./dotenv_action');
  expect(dotenv_action('fixtures/.another.env')).toEqual({ fixtures_2: 'xyz', other_key: 'this' });
});

test('test runs with broken path', () => {
  const dotenv_action = require('./dotenv_action');
  expect(() => {
    dotenv_action('nosuchfile');
  }).toThrow(Error);
});

test('test runs with expanded values', () => {
  const dotenv_action = require('./dotenv_action');
  expect(dotenv_action('fixtures/.expand.env')).toEqual({
    fixtures_3: 'xyz',
    expanded: '123-xyz',
    expanded_2: '123-xyz',
  });
});

// add tests for fixtures/.array.env
test('test runs with array values', () => {
  const dotenv_action = require('./dotenv_action');
  expect(dotenv_action('fixtures/.array.env', true)).toEqual({
    testarray: 'cats,dogs,fish',
    testarrayquoted: 'abc,def,ghi,123,456',
    testarrayquoted_element_0: 'abc',
    testarrayquoted_element_1: 'def',
    testarrayquoted_element_2: 'ghi',
    testarrayquoted_element_3: '123',
    testarrayquoted_element_4: '456',
    testarray_element_0: 'cats',
    testarray_element_1: 'dogs',
    testarray_element_2: 'fish',
  });
});
