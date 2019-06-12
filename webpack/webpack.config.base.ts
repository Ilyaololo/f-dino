import path from 'path';

import dotenv from 'dotenv';

import * as webpack from 'webpack';
import { Config } from 'webpack-config';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config = dotenv.config();

if (config.error) {
  throw config.error;
}

const configuration = new Config()
  .merge({
    // target: 'web',

    stats: {
      assets: true,
      assetsSort: 'field',
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      chunksSort: 'field',
      colors: true,
      entrypoints: false,
      errorDetails: true,
      exclude: [],
      hash: true,
      maxModules: 15,
      modules: false,
      modulesSort: 'field',
      moduleTrace: false,
      providedExports: false,
      publicPath: false,
      reasons: false,
      timings: true,
      usedExports: false,
      version: false,
    },

    entry: {
      main: path.resolve('src', 'main.ts'),
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],

      modules: [
        'node_modules',
        path.resolve('src'),
      ],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                babelCore: '@babel/core',
                cacheDirectory: 'node_modules/.cache/awesome-typescript-loader',
                silent: true,
                useBabel: true,
                useCache: true,
                useTranspileModule: true,
              },
            },
          ],
        },
      ],
    },

    output: {
      filename: 'js/[name].js',
      path: path.resolve('dist'),
    },

    plugins: [
      new Dotenv(),

      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        verbose: true,
      }),

      new HardSourceWebpackPlugin(),

      new webpack.DefinePlugin(Object.keys(config.parsed!)),

      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve('public', 'index.html'),
      }),

      new CopyWebpackPlugin([{
        force: true,
        from: path.resolve('public', 'favicon.png'),
        to: path.resolve('dist'),
      }]),

      new CopyWebpackPlugin([{
        force: true,
        from: path.resolve('public', 'img'),
        to: path.resolve('dist', 'img'),
      }]),

      new CopyWebpackPlugin([{
        force: true,
        from: path.resolve('public', 'css'),
        to: path.resolve('dist', 'css'),
      }]),

      new CopyWebpackPlugin([{
        force: true,
        from: path.resolve('public', 'resources'),
        to: path.resolve('dist', 'resources'),
      }]),
    ],
  });

export default configuration;
