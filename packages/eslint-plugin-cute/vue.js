const prettierSettings = require('./prettierSettings');

module.exports = {
  extends: 'plugin:vue/recommended',
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: '2017',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['vue'],
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'prettier/prettier': [
          'warn',
          Object.assign({ parser: 'vue' }, prettierSettings),
        ],
      },
    },
  ],
};
