module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/no-duplicates': [
      'error',
      {
        considerQueryString: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@app/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@{mobile,web}/styles/**',
            group: 'internal',
            position: 'after',
          },
          {
            /* TODO: dir増えるごとに編集するの面倒 */
            pattern: '@{mobile,web,assets}/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {order: 'asc'},
        'newlines-between': 'always',
      },
    ],
  },
};
