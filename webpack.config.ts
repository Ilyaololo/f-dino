import path from 'path';

import Config, { environment } from 'webpack-config';

function load(file: string): any {
  try {
    const wp: any[] = require(path.resolve('webpack', file)).default;

    return (Array.isArray(wp) ? wp : [wp]).map((config) => {
      const conf = new Config();

      return conf.merge(config).toObject();
    });
  } catch (err) {
    console.error(`Error: ${path.resolve('webpack', file)} not found or has errors:`);
    console.error(err);

    process.exit();
  }
}

export default function () {
  const configuration: any[] = [];

  environment.setAll({
    webpack() {
      return path.resolve(__dirname, 'webpack');
    },
  });

  if (process.env.WEBPACK_CONFIG) {
    const configurations: string[] = process.env.WEBPACK_CONFIG.trim().split(',');

    if (configurations.length > 0) {
      configurations.forEach((file) => {
        const conf = load(file);

        configuration.push(...conf);
      });
    }
  }

  if (configuration.length === 0) {
    console.error('Error: WEBPACK_CONFIG files not given');

    process.exit();
  }

  return configuration;
}
