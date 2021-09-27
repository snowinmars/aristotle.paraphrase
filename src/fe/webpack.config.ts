import {InternalOptions, Manifest} from "webpack-manifest-plugin";
import {FileDescriptor} from   "webpack-manifest-plugin/dist/helpers";
import {Compiler} from "webpack";
import {paths} from "./webpack/paths";
import {getClientEnvironment} from "./webpack/env";
import {git} from "./webpack/git";
import {getScssLoadersRules} from "./webpack/scss-loaders";

const os = require('os');
const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin, SourceMapDevToolPlugin } = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

type WebpackEnv = {
  readonly development: boolean | undefined;
  readonly production: boolean | undefined;
}

enum BuildEnv {
  none = 'none',
  development = 'development',
  production = 'production',
}

const configure = (webpackEnv: WebpackEnv) => {
  let buildEnv: BuildEnv = BuildEnv.none;

  if (webpackEnv.development === true) buildEnv = BuildEnv.development;
  if (webpackEnv.production === true) buildEnv = BuildEnv.production;
  if (buildEnv === BuildEnv.none) throw new Error(`Unknown env to build: ${JSON.stringify(webpackEnv)}`);

  process.env.BABEL_ENV = buildEnv;
  process.env.NODE_ENV = buildEnv;

  const env = getClientEnvironment();
  if (buildEnv === BuildEnv.development) {
    process.env.REACT_GIT_HASH = git('describe --always');
  }
  console.log(`Building in ${buildEnv}`);

  return {
    mode: buildEnv,
    bail: buildEnv === BuildEnv.production,
    devtool: buildEnv === BuildEnv.development ? 'source-map' : undefined,
    entry: paths.appIndexJs,
    output: {
      libraryTarget: 'umd',
      path: paths.appBuild,
      pathinfo: buildEnv === BuildEnv.development,
      publicPath: paths.publicUrlOrPath,
      chunkLoadingGlobal: `webpackJsonpPrf`,
      filename: () => buildEnv === BuildEnv.development
          ? 'static/js/[name].js'
          : 'static/js/[name].[contenthash:8].js',
      chunkFilename: () => buildEnv === BuildEnv.development
          ? 'static/js/[name].chunk.js'
          : 'static/js/[name].[contenthash:8].chunk.js',
      devtoolModuleFilenameTemplate: () => buildEnv === BuildEnv.development
          ? (info: { absoluteResourcePath: string }) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
          : (info: { absoluteResourcePath: string }) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/'),
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
    },
    watch: buildEnv === BuildEnv.development,
    watchOptions: {
      ignored: [
        paths.appNodeModules,
        paths.appEnvGen,
      ],
    },
    resolve: {
      modules: [
        'node_modules',
        paths.appNodeModules,
        buildEnv === BuildEnv.development && paths.appSrc,
      ].filter(Boolean),
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
        },
        {
          test: /\.(scss|css)$/,
          use: getScssLoadersRules(buildEnv === BuildEnv.development),
        },
        {
          test: /\.bscss$/,
          use: [
            buildEnv === BuildEnv.development ? MiniCssExtractPlugin.loader : "style-loader",
            'css-loader',
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
          compiler.hooks.compile.tap('Generate env', () => {
            console.log('\nGenerate env\n');

            // require('dotenv') was called in getClientEnvironment()
            const env = {
              MODE: buildEnv,
              GIT_KEY: process.env.REACT_GIT_HASH,
              IS_IN_DOCKER: process.env.IS_IN_DOCKER,
              REACT_APP_HOST: process.env.REACT_APP_HOST,
              REACT_APP_PORT: process.env.REACT_APP_PORT,
              REACT_APP_PROTOCOL: process.env.REACT_APP_PROTOCOL,
            };

            const envGen = './public/env-config.js.gen';

            if (fs.existsSync(envGen)) {
              fs.unlinkSync(envGen);
            }
            fs.writeFileSync(envGen, `window._env_ = ${JSON.stringify(env, null, 2)}\n`);
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
          'gitHash': process.env.REACT_GIT_HASH,
        }
      }),
      new CopyPlugin({
        patterns: [
          { from: paths.appPublic, to: "public" },
        ],
      }),
      buildEnv === BuildEnv.production && new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/runtime-.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebPackPlugin, env.raw), // Makes some environment variables available in index.html.
      new ModuleNotFoundPlugin(paths.appPath),
      new DefinePlugin(env.stringified),
      buildEnv === BuildEnv.development && new ReactRefreshWebpackPlugin({
        overlay: {
          entry: webpackDevClientEntry,
          module: reactRefreshOverlayEntry,
          sockIntegration: false,
        },
      }),
      buildEnv === BuildEnv.development && new CaseSensitivePathsPlugin(),
      buildEnv === BuildEnv.development && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
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
      buildEnv === BuildEnv.production &&
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
        async: buildEnv === BuildEnv.development,
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
        formatter: buildEnv === BuildEnv.production ? typescriptFormatter : undefined,
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
      minimize: buildEnv === BuildEnv.production,
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
}

module.exports = configure;
