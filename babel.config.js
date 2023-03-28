module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          _app: './src',
          _assets: './assets',
        },
      },
    ],
  ],
};
