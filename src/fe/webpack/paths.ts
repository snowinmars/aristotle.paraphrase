const fs = require('fs');
const path = require('path');

const appDirectory: string = fs.realpathSync(process.cwd());
export const resolveApp = (relativePath: string): string => path.resolve(appDirectory, relativePath);

// Resolve file paths in the same order as webpack
export const resolveModule = (resolveFn: (x: string) => string, filePath: string, moduleFileExtensions: string[]): string => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

export type Paths = {
  readonly dotenv: string;
  readonly appPath: string;
  readonly publicUrlOrPath: string;
  readonly appBuild: string;
  readonly appPublic: string;
  readonly appHtml: string;
  readonly appEnvGen: string;
  readonly appFavicon: string;
  readonly appIndexJs: string;
  readonly appPackageJson: string;
  readonly appSrc: string;
  readonly appTsConfig: string;
  readonly yarnLockFile: string;
  readonly appNodeModules: string;
  readonly swSrc: string;
  readonly moduleFileExtensions: readonly string[];
}

export const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'web.jsx',
  'jsx',
  'web.js',
  'js',
  'json',
];

export const paths: Paths = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  publicUrlOrPath: '/',
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appEnvGen: resolveApp('public/env-config.js.gen'),
  appFavicon: resolveApp('public/favicon.ico'),
  appIndexJs: resolveModule(resolveApp, 'src/index', moduleFileExtensions),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules'),
  swSrc: resolveModule(resolveApp, 'src/service-worker', moduleFileExtensions),
  moduleFileExtensions,
}
