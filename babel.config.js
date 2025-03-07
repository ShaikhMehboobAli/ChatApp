module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
