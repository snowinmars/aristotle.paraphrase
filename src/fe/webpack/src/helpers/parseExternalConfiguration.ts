import { getClientEnvironment } from './getClientEnvironment';
import { getDevtool } from './getDevtool';
import { ClientEnvironment, GetClientEnvironmentProps, WebpackEnv, WebpackEnvVariables } from './types';

export const parseExternalConfiguration = (webpackEnv: WebpackEnv, { dotenvFiles, allowedPrefixes, processEnv }: GetClientEnvironmentProps): [WebpackEnvVariables, ClientEnvironment] => {
  const isDev = webpackEnv.development === true;
  const isProd = webpackEnv.production === true;
  const analyze = webpackEnv.analyze === true;
  const sourceMap = webpackEnv.sourceMap === true;
  let configuration: 'development' | 'production';

  if (isDev) configuration = 'development';
  else if (isProd) configuration = 'production';
  else throw new Error(`Unknown env to build: ${JSON.stringify(webpackEnv)}`);

  if (isDev && isProd) throw new Error('Both development and production configurations are set');
  if (!isDev && !isProd) throw new Error('Neither development nor production configurations are set');

  if (!processEnv.NODE_ENV) throw new Error('NODE_ENV env var was not set');
  if (processEnv.NODE_ENV !== configuration) throw new Error(`NODE_ENV=${processEnv.NODE_ENV} doesn't match configuration ${configuration}`);
  if (!processEnv.BABEL_ENV) throw new Error('BABEL_ENV env var was not set');
  if (processEnv.BABEL_ENV !== configuration) throw new Error(`BABEL_ENV=${processEnv.BABEL_ENV} doesn't match configuration ${configuration}`);

  const env = getClientEnvironment({
    dotenvFiles, allowedPrefixes, processEnv,
  });
  const port = env.raw.ARPH_MY_PORT ? parseInt(env.raw.ARPH_MY_PORT, 10) : -3735928495;

  const vars: WebpackEnvVariables = {
    isDev,
    isProd,
    analyze,
    sourceMap,
    configuration,
    port,
  };

  console.log(`${vars.sourceMap ? 'Will' : 'Will not'} generate source maps using ${getDevtool(vars) ?? 'undefined'}`);
  if (vars.analyze) console.log('Will run analyzer');

  return [ vars, env ];
};
