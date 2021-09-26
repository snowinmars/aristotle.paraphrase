import {InternalOptions, Manifest} from "webpack-manifest-plugin";
import {FileDescriptor} from   "webpack-manifest-plugin/dist/helpers";
import {Compiler} from "webpack";

const os = require('os');
const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const child_process = require('child_process');
const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin, SourceMapDevToolPlugin } = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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

type Paths = {
  readonly dotenv: string;
  readonly appPath: string;
  readonly publicUrlOrPath: string;
  readonly appBuild: string;
  readonly appPublic: string;
  readonly appHtml: string;
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

const paths: Paths = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  publicUrlOrPath: '/',
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
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

const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';
const git = (command: string): string => child_process.execSync(`git ${command}`, {encoding: 'utf8'}).trim()

type WebpackEnv = {
  readonly development: boolean | undefined;
  readonly production: boolean | undefined;
}

const configure = (webpackEnv: WebpackEnv) => {
  const isEnvDevelopment = webpackEnv.development === true;
  const isEnvProduction = webpackEnv.production === true;

  process.env.BABEL_ENV = isEnvDevelopment ? 'development' : 'production';
  process.env.NODE_ENV = isEnvDevelopment ? 'development' : 'production';

  const getClientEnvironment = require('./config/env');
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  if (!isEnvProduction && !isEnvDevelopment) throw new Error(`Unknown env to build: ${JSON.stringify(webpackEnv)}`);
  console.log('Building in', process.env.NODE_ENV === 'development' ? 'development' : 'production'); // rechecking NODE_ENV

  const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');

  const config = {
    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    devtool: 'source-map',
    entry: paths.appIndexJs,
    output: {
      libraryTarget: 'umd',
      path: paths.appBuild,
      pathinfo: isEnvDevelopment,
      publicPath: paths.publicUrlOrPath,
      chunkLoadingGlobal: `webpackJsonpPrf`,
      filename: () => isEnvProduction
          ? 'static/js/[name].[contenthash:8].js'
          : 'static/js/[name].js',
      chunkFilename: () => isEnvProduction
          ? 'static/js/[name].[contenthash:8].chunk.js'
          : 'static/js/[name].chunk.js',
      devtoolModuleFilenameTemplate: () => isEnvProduction
          ? (info: { absoluteResourcePath: string }) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
          : (info: { absoluteResourcePath: string }) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
    },
    resolve: {
      modules: [
        'node_modules',
        paths.appNodeModules,
        isEnvDevelopment && paths.appSrc,
      ].filter(Boolean),
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support for React Native Web
      extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
      plugins: [
        // appBuild is a hack
        new ModuleScopePlugin(paths.appBuild, [
          'node_modules',
          paths.appNodeModules,
          paths.appPackageJson,
          reactRefreshOverlayEntry,
        ]),
      ],
    },
    devServer: {
      port: 3000,
      historyApiFallback: true
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          parser: {
            requireEnsure: false
          }
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: paths.appSrc,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
            presets: [
              [
                require.resolve('babel-preset-react-app'),
                {
                  runtime: 'automatic',
                },
              ],
            ],
            plugins: [
              [
                require.resolve("babel-plugin-transform-react-jsx"),
                {
                  "runtime": "automatic",
                }
              ],
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                    },
                  },
                },
              ],
              isEnvDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
            cacheDirectory: true, // caching in ./node_modules/.cache/babel-loader/
            cacheCompression: false, // See #6846 for context on why cacheCompression is disabled
            compact: isEnvProduction,
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isEnvDevelopment ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            } : {
              loader: "style-loader",
              options: {
                insert: '#insert-css-here',
                esModule: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  namedExport: false,
                  localIdentName: isEnvDevelopment ? "[local]--[hash:base64:5]" : "[hash:base64:8]",
                  exportLocalsConvention: "camelCaseOnly",
                },
              }
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      {
        apply(compiler: Compiler) {
          compiler.hooks.beforeRun.tap('Generate env', () => {
            require('dotenv').config();
            const env = {
              GIT_KEY: isEnvDevelopment ? git('describe --always') : process.env.REACT_GIT_HASH,
              MODE: isEnvDevelopment ? 'development' : 'production',
              IS_IN_DOCKER: process.env.IS_IN_DOCKER,
              REACT_APP_HOST: process.env.REACT_APP_HOST,
              REACT_APP_PORT: process.env.REACT_APP_PORT,
              REACT_APP_PROTOCOL: process.env.REACT_APP_PROTOCOL,
            };

            const envGen = './public/env-config.js.gen';

            if (fs.existsSync(envGen)) {
              fs.unlinkSync(envGen);
            }
            fs.writeFileSync(envGen, `window._env_ = ${JSON.stringify(env, null, 2)}`);
          })
        }
      },
      new HtmlWebPackPlugin({
        title: 'Prf',
        filename: 'index.html',
        template: 'public/index.html',
        inject: true,
        favicon: paths.appFavicon,
        meta: {
          'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
          'theme-color': '#495057',
          'description': 'Парафраз Метафизики Аристотеля',
          'charset': 'utf-8',
        }
      }),
      new CopyPlugin({
        patterns: [
          { from: paths.appPublic, to: "public" },
        ],
      }),
      isEnvProduction && new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/runtime-.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebPackPlugin, env.raw), // Makes some environment variables available in index.html.
      new ModuleNotFoundPlugin(paths.appPath),
      new DefinePlugin(env.stringified),
      isEnvDevelopment && new ReactRefreshWebpackPlugin({
        overlay: {
          entry: webpackDevClientEntry,
          module: reactRefreshOverlayEntry,
          sockIntegration: false,
        },
      }),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed: Record<string, string>, files: FileDescriptor[], entries: Record<string, string[]>): Manifest => {
          const manifestFiles = files.reduce((manifest: Record<string, string>, file: FileDescriptor): Record<string, string> => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);

          const entrypointFiles = entries.main.filter(
              fileName => !fileName.endsWith('.map')
          ).join(';');

          return {
            ...manifestFiles,
            "entrypoints": entrypointFiles,
          };
        },
      } as Partial<InternalOptions>),
      // Generate a service worker script that will precache, and keep up to date,
      // the HTML & assets that are part of the webpack build.
      isEnvProduction &&
      fs.existsSync(paths.swSrc) &&
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: paths.swSrc,
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 2mb
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: paths.appNodeModules,
        }),
        async: isEnvDevelopment,
        checkSyntacticErrors: true,
        resolveModuleNameModule: process.versions.pnp
            ? `${__dirname}/pnpTs.js`
            : undefined,
        resolveTypeReferenceDirectiveModule: process.versions.pnp
            ? `${__dirname}/pnpTs.js`
            : undefined,
        tsconfig: paths.appTsConfig,
        reportFiles: [
          // This one is specifically to match during CI tests,
          // as micromatch doesn't match
          // '../cra-template-typescript/template/src/App.tsx'
          // otherwise.
          '../**/src/**/*.{ts,tsx}',
          '**/src/**/*.{ts,tsx}',
          '!**/src/**/__tests__/**',
          '!**/src/**/?(*.)(spec|test).*',
          '!**/src/setupProxy.*',
          '!**/src/setupTests.*',
        ],
        silent: false,
        formatter: isEnvProduction ? typescriptFormatter : undefined,
      }),
      isEnvDevelopment && new BundleAnalyzerPlugin({
        analyzerHost: '127.0.0.1',
        analyzerPort: '8888',
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        insert: '#insert-css-here',
      }),
      new SourceMapDevToolPlugin({
        filename: "[file].map"
      }),
    ].filter(Boolean),
    optimization: {
      usedExports: true,
      nodeEnv: process.env.NODE_ENV,
      minimize: isEnvProduction,
      minimizer: [new TerserPlugin({
        parallel: os.cpus().length - 1,
        terserOptions: {
          sourceMap: true,
          ecma: 5,
        }
      })],
    },
    stats: {
      children: false,
      errorDetails: true,
    },
  };

  // console.log(JSON.stringify(config));

  return config;
}

module.exports = configure;
