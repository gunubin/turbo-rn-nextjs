module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-extraneous-dependencies': [2, {
      // 'packageDir': ['../../apps/web', '../../apps/mobile', '../../domain/app', '../../domain/todo'],
      devDependencies: [
        '**/__tests__/**', // jest pattern
        'test.ts', // repos with a single test file
        '**/*.test.ts', // tests where the extension denotes that it is a test
      ],
      optionalDependencies: false,
    }],
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
            pattern: '@domain/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/styles/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/**',
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
