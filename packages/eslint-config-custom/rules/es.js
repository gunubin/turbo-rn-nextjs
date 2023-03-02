module.exports = {
  overrides: [
    {
      files: ['*.js'],
      env: {
        es6: true,
        node: true,
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      extends: ['eslint:recommended', 'prettier'],
    },
  ],
};
