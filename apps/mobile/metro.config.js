/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getMetroConfig} = require('react-native-monorepo-tools');

const metroConfig = getMetroConfig();

const watchFolders = metroConfig.watchFolders.filter(w => w.match(/domain|node_modules/));

module.exports = {
  watchFolders,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
