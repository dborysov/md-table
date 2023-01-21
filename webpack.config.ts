import * as path from 'path';
import * as webpack from 'webpack';

const generalConfig: webpack.Configuration = {
  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
};

const nodeEsmConfig: webpack.Configuration = {
  ...generalConfig,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'node-esm.js',
    library: { type: 'commonjs-static' },
  },
};

const nodeRequireConfig: webpack.Configuration = {
  ...generalConfig,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'node-require.js',
    library: { name: 'mdTable', type: 'umd' },
  },
};

const browserConfig: webpack.Configuration = {
  ...generalConfig,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'browser.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
    library: 'mdTable',
  },
};

export default [nodeEsmConfig, browserConfig, nodeRequireConfig];
