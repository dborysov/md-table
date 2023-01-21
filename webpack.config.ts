import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
  },
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

export default config;
