import { existsSync } from 'fs';

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

import { ClientEnvironment, GetClientEnvironmentProps } from './types';

const emptyEnv: NodeJS.ProcessEnv = {} as NodeJS.ProcessEnv;

const parseEnv = (dotenvFiles: string[] | null | undefined): NodeJS.ProcessEnv => {
  if (!dotenvFiles) return emptyEnv;

  return dotenvFiles.reduce<NodeJS.ProcessEnv>((acc: NodeJS.ProcessEnv, dotenvFile) => {
    if (existsSync(dotenvFile)) {
      console.log(`Found env file at ${dotenvFile}`);

      return {
        ...acc,
        ...expand(config({
          path : dotenvFile,
        }))
          .parsed,
      };
    }

    return acc;
  }, emptyEnv);
};

export function getClientEnvironment({
  dotenvFiles,
  allowedPrefixes,
  processEnv,
}: GetClientEnvironmentProps): ClientEnvironment {
  const parsedEnv = parseEnv(dotenvFiles);

  const combinedEnv: NodeJS.ProcessEnv = {
    ...process.env, // current
    ...processEnv, // parent
    ...parsedEnv, // env
  };

  const raw = Object.keys(combinedEnv)
    .reduce<NodeJS.ProcessEnv>(
      (env, key) => {
        const allowed = allowedPrefixes.some((x) => x.test(key));
        if (!allowed) {
          env[key] = undefined;
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete env[key];
          return env;
        }

        const value = env[key];
        if (!value) throw new Error(`${key} was required from process.env but was not provided`);
        return env;
      }, { ...combinedEnv });

  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'process.env' : Object.keys(raw)
      .reduce<NodeJS.ProcessEnv>((env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      }, { ...raw }),
  };

  return { raw, stringified };
}
