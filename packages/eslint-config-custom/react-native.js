const rules = ['./rules/base', './rules/import', './rules/jsdoc'].map(require.resolve)

module.exports = {
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: ['@react-native-community', ...rules],
      plugins: ['react-native'],
      rules: {
        'react-native/no-unused-styles': 'error',
        'react-native/no-inline-styles': 'error',
      },
    },
  ],
};
