const ext = ['./react'].map(require.resolve)

module.exports = {
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: [...ext],
      plugins: ['react-native'],
      rules: {
        'react-native/no-unused-styles': 'error',
        'react-native/no-inline-styles': 'error',
      },
    },
  ],
};
