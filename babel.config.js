module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@components": "./src/components",
          "@assets/*": ["./src/assets"],
          "@components": ["./src/components"],
          "@screens": ["./src/screens"],
          "@models": ["./src/models"],
          "@hooks": ["./src/hooks"],
          "@helpers": ["./src/helpers"],
          "@types": ["./src/types"],
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
