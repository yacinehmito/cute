const prettierSettings = require('./prettierSettings');

module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['json', 'prettier'],
  parserOptions: {
    ecmaVersion: '2017',
  },
  env: {
    es6: true,
  },
  rules: {
    'prettier/prettier': ['warning', prettierSettings],
  },
};
