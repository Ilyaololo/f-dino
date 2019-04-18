import { Config } from 'webpack-config';

const configuration = new Config()
  .extend({
    '[webpack]/webpack.config.base.ts': (conf) => {
      return conf;
    },
  })
  .merge({
    mode: 'development',

    watch: true,
  });

export default configuration;
