// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            components: './src/components',
            buttons: './src/components/buttons',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
