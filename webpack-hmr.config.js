const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const options = require('./webpack.config');
const webpack = require('webpack');

module.exports = {
  ...options,
  mode: 'development',
  entry: ['webpack/hot/poll?100', options.entry],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  plugins: [
    ...options.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
    new RunScriptWebpackPlugin({ name: options.output.filename }),
  ],
};
