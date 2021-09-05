const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PrebuildPlugin = require('prebuild-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const child_process = require('child_process');
const paths = require('./config/paths');
const modules = require('./config/modules');
const getClientEnvironment = require('./config/env');
const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop');

const { IgnorePlugin, DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';
const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';
const appPackageJson = require(paths.appPackageJson);
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
const shouldUseReactRefresh = env.raw.FAST_REFRESH;
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appNodeModules = resolveApp('node_modules');
const git = (command) => {
  return child_process.execSync(`git ${command}`, { encoding: 'utf8' }).trim();
}

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false;
  }

  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

const configurate = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv.development === true;
  const isEnvProduction = webpackEnv.production === true;

  if (!isEnvProduction && !isEnvDevelopment) throw new Error(`Unknown env to build: ${JSON.stringify(webpackEnv)}`);

  const isEnvProductionProfile =
      isEnvProduction && process.argv.includes('--profile');

  const config = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // Stop compilation early in production
    bail: isEnvProduction,
    devtool: isEnvProduction
        ? false
        : 'cheap-module-source-map',
    entry: paths.appIndexJs,
    output: {
      libraryTarget: 'umd',
      // The build folder.
      path: paths.appBuild,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: isEnvDevelopment,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: () => isEnvProduction
          ? 'static/js/[name].[contenthash:8].js'
          : 'static/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: () => isEnvProduction
          ? 'static/js/[name].[contenthash:8].chunk.js'
          : 'static/js/[name].chunk.js',
      // webpack uses `publicPath` to determine where the app is being served from.
      // It requires a trailing slash, or the file assets will get an incorrect path.
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: paths.publicUrlOrPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: () => isEnvProduction
          ? info =>
              path
                  .relative(paths.appSrc, info.absoluteResourcePath)
                  .replace(/\\/g, '/')
          : info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
      // Prevents conflicts when multiple webpack runtimes (from different apps)
      // are used on the same page.
      chunkLoadingGlobal: `webpackJsonp${appPackageJson.name}`,
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
    },
    resolve: {
      // This allows you to set a fallback for where webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253
      modules: ['node_modules', paths.appNodeModules].concat(
          modules.additionalModulePaths || []
      ),
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: paths.moduleFileExtensions
          .map(ext => `.${ext}`),
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
      },
      plugins: [
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [
          paths.appPackageJson,
          reactRefreshOverlayEntry,
        ]),
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: paths.appSrc,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
            ),
            presets: [
              [
                require.resolve('babel-preset-react-app'),
                {
                  runtime: hasJsxRuntime ? 'automatic' : 'classic',
                },
              ],
            ],
            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                    },
                  },
                },
              ],
              isEnvDevelopment &&
              shouldUseReactRefresh &&
              require.resolve('react-refresh/babel'),
            ].filter(Boolean),
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            // See #6846 for context on why cacheCompression is disabled
            cacheCompression: false,
            compact: isEnvProduction,
          },
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            "css-loader",
            "postcss-loader",
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
      new PrebuildPlugin({
        build: (compiler, compilation, matchedFiles) => {
          require('dotenv').config();
          const env = {
            GIT_KEY: process.env.GIT_KEY,
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
        }
      }),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebPackPlugin(
          Object.assign(
              {},
              {
                inject: true,
                template: paths.appHtml,
              },
              isEnvProduction
                  ? {
                    minify: {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeRedundantAttributes: true,
                      useShortDoctype: true,
                      removeEmptyAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      keepClosingSlash: true,
                      minifyJS: true,
                      minifyCSS: true,
                      minifyURLs: true,
                    },
                  }
                  : undefined
          )
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      // https://github.com/facebook/create-react-app/issues/5358
      isEnvProduction &&
      shouldInlineRuntimeChunk &&
      new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/runtime-.+[.]js/]),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebPackPlugin, env.raw),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(paths.appPath),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV is set to production
      // during a production build.
      // Otherwise React will be compiled in the very slow development mode.
      new DefinePlugin(env.stringified),
      // This is necessary to emit hot updates (CSS and Fast Refresh):
      isEnvDevelopment && new HotModuleReplacementPlugin(),
      // Experimental hot reloading for React .
      // https://github.com/facebook/react/tree/master/packages/react-refresh
      isEnvDevelopment &&
      shouldUseReactRefresh &&
      new ReactRefreshWebpackPlugin({
        overlay: {
          entry: webpackDevClientEntry,
          // The expected exports are slightly different from what the overlay exports,
          // so an interop is included here to enable feedback on module-level errors.
          module: reactRefreshOverlayEntry,
          // Since we ship a custom dev client and overlay integration,
          // the bundled socket handling logic can be eliminated.
          sockIntegration: false,
        },
      }),
      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebook/create-react-app/issues/240
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      // If you require a missing module and then `npm install` it, you still have
      // to restart the development server for webpack to discover it. This plugin
      // makes the discovery automatic so you don't have to restart.
      // See https://github.com/facebook/create-react-app/issues/186
      isEnvDevelopment &&
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      // Generate an asset manifest file with the following content:
      // - "files" key: Mapping of all asset filenames to their corresponding
      //   output file so that tools can pick it up without having to parse
      //   `index.html`
      // - "entrypoints" key: Array of files which are included in `index.html`,
      //   can be used to reconstruct the HTML if necessary
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
              fileName => !fileName.endsWith('.map')
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      // Generate a service worker script that will precache, and keep up to date,
      // the HTML & assets that are part of the webpack build.
      isEnvProduction &&
      fs.existsSync(paths.swSrc) &&
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: paths.swSrc,
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
        // Bump up the default maximum size (2mb) that's precached,
        // to make lazy-loading failure scenarios less likely.
        // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }),
      // TypeScript type checking
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
        silent: true,
        // The formatter is invoked directly in WebpackDevServerUtils during development
        formatter: isEnvProduction ? typescriptFormatter : undefined,
      }),
    ].filter(Boolean),
  };

  console.log(JSON.stringify(config));

  return config;
}

module.exports = configurate;
