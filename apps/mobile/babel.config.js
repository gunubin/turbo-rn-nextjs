module.exports = {
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        path: `${__dirname}/../../.env`,
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@app': `${__dirname}/../../domain/app/src`,
          '@todo': `${__dirname}/../../domain/todo/src`,
          '@': `${__dirname}/src`,
        },
        extensions: ['.js', '.ts', '.tsx'],
        root: ['.'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
