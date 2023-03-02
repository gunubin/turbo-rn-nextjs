const react = ['./rules/react'].map(require.resolve)
const es = ['./rules/es'].map(require.resolve)

module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      extends: es,
    },
    {
      files: ['**/*.ts?(x)'],
      extends: react,
    },
  ],
};
