module.exports = {
  root: true,
  extends: ['prettier', '@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  rules: {
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        // varsIgnorePattern: '^_',
        // caughtErrorsIgnorePattern: '^_',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    curly: 0,
    'no-bitwise': 0,
    'no-shadow': ['warn', { allow: ['done', 'resolve', 'cb'] }],
    'react-native/no-unused-styles': 1,
    'react-native/no-color-literals': 1,
    'react/jsx-no-bind': 1,
  },
};
