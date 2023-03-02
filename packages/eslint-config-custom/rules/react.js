const ext = ['./base', './import'].map(require.resolve);

module.exports = {
  env: {
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    ...ext,
  ],
  plugins: ['react-hooks'],
  rules: {
    'react/jsx-key': [2, {checkFragmentShorthand: true}],
    // TypeScriptでpropsの型をチェックするので、prop-typesはoffに設定
    'react/prop-types': 'off',
    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    // typescript-eslint
    '@typescript-eslint/no-explicit-any': 'off', // FIXME: よくない
  },
};
