const ext = ['./rules/import'].map(require.resolve);

module.exports = {
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: ['@react-native-community', ...ext],
      plugins: ['react-native'],
      rules: {
        'react-native/no-unused-styles': 'error',
        'react-native/no-inline-styles': 'error',
      },
    },
  ],
};
