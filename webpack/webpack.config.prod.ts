'use strict';

import * as webpack from 'webpack';
import { Config } from 'webpack-config';

import LodashWebpackPlugin from 'lodash-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const configuration = new Config()
  .extend({
    '[webpack]/webpack.config.base.ts': (conf) => {
      return conf;
    },
  })
  .merge({
    mode: 'production',

    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            compress: true,
          },
        }),
      ],
    },

    output: {
      filename: '[name].js',
    },

    plugins: [
      new webpack.optimize.AggressiveMergingPlugin(),

      new LodashWebpackPlugin(),
    ],
  });

export default configuration;
