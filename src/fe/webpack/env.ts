const fs = require('fs');

const dotenvFiles = [
  '.env',
]

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

const REACT_APP = /^REACT_APP_/i;

export function getClientEnvironment() {
  if (!process.env.NODE_ENV) {
    throw new Error('process.env.NODE_ENV was not set')
  }

  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce<Record<string, string>>(
      (env, key) => {
        const value = process.env[key]

        if (!value) {
          throw new Error(`${key} was required from process but was not provided`);
        }

        env[key] = value;
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV,
      }
    );

  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce<Record<string, string>>((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}
