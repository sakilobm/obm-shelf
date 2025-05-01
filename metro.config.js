const { getDefaultConfig } = require('expo/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Get the default Expo Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Wrap the default configuration with Reanimated's configuration
module.exports = wrapWithReanimatedMetroConfig(defaultConfig);