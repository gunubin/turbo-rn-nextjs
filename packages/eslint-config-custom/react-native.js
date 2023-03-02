const ext = ['./rules/react-native'].map(require.resolve)

module.exports = {
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: [...ext],
    },
  ],
};
