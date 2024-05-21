const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
        {
            test: /\.node/,
            use: 'node-loader'
        },
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  target: 'node',
};
