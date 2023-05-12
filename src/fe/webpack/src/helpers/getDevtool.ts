import { WebpackEnvVariables } from './types';

export const getDevtool = (variables: WebpackEnvVariables): string | undefined => {
  if (!variables.sourceMap) return undefined;

  if (variables.isDev) return 'eval-source-map';

  if (variables.isProd) return 'source-map';

  return undefined;
};
