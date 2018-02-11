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
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            parser: 'vue',
          },
        ],
      },
    },
  ],
};
