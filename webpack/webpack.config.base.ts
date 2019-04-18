import path from 'path';

import { Config } from 'webpack-config';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const configuration = new Config()
  .merge({
    // target: 'web',

    stats: {
      // Add asset Information
      assets: true,

      // Sort assets by a field
      assetsSort: 'field',

      // Add information about cached (not built) modules
      cached: false,

      // Show cached assets (setting this to `false` only shows emitted files)
      cachedAssets: false,

      // Add children information
      children: false,

      // Add chunk information (setting this to `false` allows for a less verbose output)
      chunks: false,

      // Add built modules information to chunk information
      chunkModules: false,

      // Add the origins of chunks and chunk merging info
      chunkOrigins: false,

      // Sort the chunks by a field
      chunksSort: 'field',

      // `webpack --colors` equivalent
      colors: true,

      // Display the entry points with the corresponding bundles
      entrypoints: false,

      // Add details to errors (like resolving log)
      errorDetails: true,

      // Exclude modules which match one of the given strings or regular expressions
      exclude: [],

      // Add the hash of the compilation
      hash: true,

      // Set the maximum number of modules to be shown
      maxModules: 15,

      // Add built modules information
      modules: false,

      // Sort the modules by a field
      modulesSort: 'field',

      // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
      moduleTrace: false,

      // Show the exports of the modules
      providedExports: false,

      // Add public path information
      publicPath: false,

      // Add information about the reasons why modules are included
      reasons: false,

      // Add timing information
      timings: true,

      // Show which exports of a module are used
      usedExports: false,

      // Add webpack version information
      version: false,
    },

    entry: {
      main: [
        path.resolve('src', 'main.ts'),
      ],
    },

    resolve: {
      extensions: ['.js', '.ts', '.json'],

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
      }),

      new HardSourceWebpackPlugin(),

      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve('public', 'index.html'),
      }),

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
        from: path.resolve('src', 'models'),
        to: path.resolve('dist', 'models'),
      }]),
    ],
  });

export default configuration;
