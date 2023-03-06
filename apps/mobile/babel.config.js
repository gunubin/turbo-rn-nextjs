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
          '@domain/app': `${__dirname}/../../domain/app/src`,
          '@domain/todo': `${__dirname}/../../domain/todo/src`,
          '@': `${__dirname}/src`,
        },
        extensions: ['.js', '.ts', '.tsx'],
        root: ['.'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
