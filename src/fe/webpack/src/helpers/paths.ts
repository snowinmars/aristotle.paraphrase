import { mkdirSync, existsSync, realpathSync } from 'fs';
import { resolve, join } from 'path';

import { slash } from './slash';
import { WebpackPaths } from './types';

const appDirectory: string = realpathSync(process.cwd());

const moduleFileExtensions = [
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

// Did not work on windows (slash)
const resolveApp = (relativePath: string): string => /*slash(*/resolve(appDirectory, relativePath)/*)*/;

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn: (x: string) => string, filePath: string, moduleFileExtensions: string[]): string => {
  const extension = moduleFileExtensions.find((extension) => existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) return resolveFn(`${filePath}.${extension}`);

  return resolveFn(`${filePath}.js`);
};

export const getPaths = (overrides?: Partial<WebpackPaths> | undefined): WebpackPaths => {
  const publicPath = resolveApp(overrides?.public ?? 'public');
  const distPath = resolveApp(overrides?.dist ?? 'dist');
  const srcPath = resolveApp(overrides?.src ?? 'src');

  const paths: WebpackPaths = {
    dotenv          : resolveApp(overrides?.dotenv ?? '.env'),
    root            : resolveApp(overrides?.root ?? '.'),
    publicUrlOrPath : overrides?.publicUrlOrPath ?? '/',
    public          : publicPath,
    publicHtml      : resolveApp(overrides?.publicHtml ?? join(publicPath, 'index.html')),
    publicEnvGen    : resolveApp(overrides?.publicEnvGen ?? join(publicPath, 'env-config.js.gen')),
    publicManifest  : resolveApp(overrides?.publicManifest ?? join(publicPath, 'manifest.json')),
    publicRobots    : resolveApp(overrides?.publicRobots ?? join(publicPath, 'robots.txt')),
    publicCssThemes : overrides?.publicCssThemes ?? [
      resolveApp(join(publicPath, 'dark.theme.dx.css')),
      resolveApp(join(publicPath, 'light.theme.dx.css')),
    ],
    publicFtpIcons : overrides?.publicFtpIcons ?? [
      resolveApp(join(publicPath, 'ftpTreeIcons/**')),
    ],
    publicFonts : overrides?.publicFonts ?? [
      resolveApp(join(publicPath, 'icons/dxicons.ttf')),
      resolveApp(join(publicPath, 'icons/dxicons.woff')),
      resolveApp(join(publicPath, 'icons/dxicons.woff2')),
      resolveApp(join(publicPath, 'icons/dxiconsmaterial.ttf')),
      resolveApp(join(publicPath, 'icons/dxiconsmaterial.woff')),
      resolveApp(join(publicPath, 'icons/dxiconsmaterial.woff2')),
    ],
    publicFavicon        : resolveApp(overrides?.publicFavicon ?? join(publicPath, 'favicon.ico')),
    packageJson          : resolveApp(overrides?.packageJson ?? 'package.json'),
    yarnLockFile         : resolveApp(overrides?.yarnLockFile ?? 'yarn.lock'),
    tsConfig             : resolveApp(overrides?.tsConfig ?? 'tsconfig.json'),
    nodeModules          : resolveApp(overrides?.nodeModules ?? 'node_modules'),
    srcServiceWorker     : resolveModule(resolveApp, overrides?.srcServiceWorker ?? join('src', 'service-worker'), moduleFileExtensions),
    webpackExtensions    : resolveApp(overrides?.webpackExtensions ?? 'webpack'),
    moduleFileExtensions : overrides?.moduleFileExtensions ?? moduleFileExtensions,
    src                  : srcPath,
    srcIndex             : resolveModule(resolveApp, overrides?.srcIndex ?? join(srcPath, 'index'), moduleFileExtensions),
    dist                 : distPath,
    distPublic           : resolveApp(overrides?.distPublic ?? join(distPath, 'public')),
    distEnvGen           : resolveApp(overrides?.distEnvGen ?? join(distPath, 'public', 'env-config.js.gen')),
    distManifest         : resolveApp(overrides?.distManifest ?? join(distPath, 'public', 'manifest.json')),
    distIndexRelative    : overrides?.distIndexRelative ?? 'index.js',
  };

  if (!existsSync(paths.dist)) mkdirSync(paths.dist);

  return paths;
};
