module.exports = {
  plugins: ['jest'],
  overrides: [
    {
      files: [
        '**/__tests__/**/*.js?(x)',
        '**/?(*.)test.js?(x)',
        '**/?(*.)spec.js?(x)',
      ],
      env: {
        'jest/globals': true,
      },
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
    {
      files: ['**/__mocks__/**/*.js?(x)'],
      globals: {
        jest: false,
      },
    },
  ],
};
