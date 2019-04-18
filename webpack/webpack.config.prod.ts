'use strict';

import webpack from 'webpack';
import { Config } from 'webpack-config';

const configuration = new Config()
  .extend({
    '[webpack]/webpack.config.base.ts': (conf) => {
      return conf;
    },
  })
  .merge({
    mode: 'production',

    output: {
      filename: '[name].js',
    },

    plugins: [
      new webpack.optimize.AggressiveMergingPlugin(),

      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  });

export default configuration;
