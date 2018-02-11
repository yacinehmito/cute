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
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
        jsxBracketSameLine: true,
        parser: 'flow',
      },
    ],
  },
};
