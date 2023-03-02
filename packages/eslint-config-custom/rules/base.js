module.exports = {
  rules: {
    'no-redeclare': 'error',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info', 'table'],
      },
    ],
    quotes: ['error', 'single'],
    'sort-keys': [2, 'asc', {caseSensitive: true, natural: true}],
  },
};
