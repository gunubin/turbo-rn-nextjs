const es = require.resolve('./es');
const react = require.resolve('./react');

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
