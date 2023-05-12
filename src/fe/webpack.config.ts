import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path, { join } from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { DefinePlugin, RuleSetRule, SourceMapDevToolPlugin, WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { WebpackConfiguration } from 'webpack-cli';
import { InternalOptions, WebpackManifestPlugin } from 'webpack-manifest-plugin';

import packageJson from './package.json';
import { getDevtool } from './webpack/src/helpers/getDevtool';
import { parseExternalConfiguration } from './webpack/src/helpers/parseExternalConfiguration';
import { getPaths } from './webpack/src/helpers/paths';
import { WebpackEnv } from './webpack/src/helpers/types';
import { EnvGeneratorPlugin } from './webpack/src/plugins/env-generator-plugin';
import { PackageJsonGeneratorPlugin } from './webpack/src/plugins/package-json-generator-plugin';

// FIXME: xxx
const emptyEnv: NodeJS.ProcessEnv = {} as NodeJS.ProcessEnv;

// FIXME: xxx
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

const configure = (webpackEnv: WebpackEnv): WebpackConfiguration => {
  const parsedEnv = parseEnv([ './.env' ]);
  const paths = getPaths({ publicUrlOrPath: parsedEnv.ARPH_PUBLIC_URL_OR_PATH });
  [
    paths.distPublic,
  ].forEach((x) => {
    if (!existsSync(x)) mkdirSync(x);
  });

  [
    paths.distManifest,
    paths.publicManifest,
  ].forEach((x) => {
    if (!existsSync(x)) writeFileSync(x, '', { encoding: 'utf-8' });
  });

  const [ vars, env ] = parseExternalConfiguration(webpackEnv, {
    dotenvFiles : [
      paths.dotenv,
    ],
    allowedPrefixes : [
      /NODE_ENV/,
      /BABEL_ENV/,
      /ARPH_.*/,
    ],
    processEnv : {
      ...process.env,
      ARPH_BASE_HREF : paths.publicUrlOrPath,
    },
  });

  let sourceMapFilename: string | undefined = undefined;

  if (vars.sourceMap) {
    if (vars.isDev) sourceMapFilename = '[name].map';
    else sourceMapFilename = '[name].[contenthash].map';
  }

  return {
    mode    : vars.configuration,
    bail    : vars.isProd,
    devtool : getDevtool(vars),
    entry   : paths.srcIndex,
    target  : 'web',

    output : {
      uniqueName          : packageJson.name,
      library             : packageJson.name,
      libraryTarget       : 'umd',
      path                : paths.dist,
      publicPath          : paths.publicUrlOrPath,
      filename            : vars.isDev ? '[name].js' : '[name].[contenthash].js',
      chunkFilename       : vars.isDev ? '[name].js' : '[name].[contenthash].js',
      cssFilename         : vars.isDev ? '[name].[ext]' : '[name].[contenthash].[ext]',
      assetModuleFilename : vars.isDev ? '[name].[ext]' : '[name].[contenthash].[ext]',
      sourceMapFilename   : sourceMapFilename,
      clean               : true,
      globalObject        : 'this',
    },

    watch        : vars.isDev,
    watchOptions : {
      ignored : [
        paths.nodeModules,
        paths.publicEnvGen,
        paths.dist,
      ],
    },

    resolve : {
      alias : {
        'src'   : paths.src,
      },
      fallback : {
      },
      modules : [
        'node_modules',
        paths.nodeModules,
        vars.isDev && paths.src,
      ].filter(Boolean) as string[],
      extensions : paths.moduleFileExtensions.map((ext: string) => `.${ext}`),
    },

    devServer : {
      port               : vars.port,
      historyApiFallback : {
        index    : `/${paths.publicUrlOrPath}/index.html`,
        rewrites : [ {
          from : new RegExp(paths.publicUrlOrPath.slice(0, paths.publicUrlOrPath.length - 1)), // /url/ -> /url
          to   : paths.publicUrlOrPath,
        }, {
          from : new RegExp('^/$'),
          to   : paths.publicUrlOrPath,
        }, {
          from : new RegExp('^$'),
          to   : paths.publicUrlOrPath,
        } ],
      },
      static : {
        directory : paths.public,
      },
      hot           : true,
      devMiddleware : {
        writeToDisk : true,
      },
    },

    module : {
      strictExportPresence : true,
      rules                : [
        {
          test    : /\.gen.ts$/,
          loader  : 'string-replace-loader',
          options : {
            search : '\\<%= currentFolderName %\\>',
            replace(): string {
              // @ts-ignore
              const dirPath = path.dirname(this.resource as string);
              const dirName = path.parse(dirPath).name;
              return dirName;
            },
            flags : 'g',
          },
        },
        // Handle node_modules packages that contain sourcemaps
        vars.sourceMap && {
          enforce : 'pre',
          exclude : [ /@babel(?:\/|\\{1,2})runtime/, /node_modules/ ],
          test    : /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader  : require.resolve('source-map-loader'),
        },

        {
          oneOf : [
            {
              test : /\.graphql/,
              type : 'asset/source',
            },
            // TODO: Merge this config once `image/avif` is in the mime-db
            // https://github.com/jshttp/mime-db
            {
              test     : [ /\.avif$/ ],
              type     : 'asset',
              mimetype : 'image/avif',
              parser   : {
                dataUrlCondition : {
                  maxSize : 10_000,
                },
              },
            },
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test   : [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
              type   : 'asset',
              parser : {
                dataUrlCondition : {
                  maxSize : 10_000,
                },
              },
            },
            {
              test    : [ /\.svg$/ ],
              include : [ paths.src ],
              use     : [
                {
                  loader : 'babel-loader',
                },
                {
                  loader  : 'react-svg-loader',
                  options : {
                    presets : [
                      [ 'es2020', { modules: false } ],
                    ],
                    svgo : {
                      plugins : [
                        { removeTitle: false },
                      ],
                      floatPrecision : 2,
                    },
                    jsx : true,
                  },
                },
              ],
            },
            {
              // - apply class name hashing
              // - inject into html head
              test : [ /\.module\.(scss|css)$/ ],
              use  : [
                vars.isDev ? {
                  loader  : MiniCssExtractPlugin.loader,
                  options : {
                    esModule : true,
                  },
                } : {
                  loader  : 'style-loader',
                  options : {
                    insert   : '#insert-css-here',
                    esModule : true,
                  },
                },
                {
                  loader  : 'css-loader',
                  options : {
                    importLoaders : 1,
                    modules       : {
                      namedExport            : false,
                      localIdentName         : vars.isDev ? '[local]--[hash:base64:4]' : '[hash:base64:4]',
                      exportLocalsConvention : 'camelCaseOnly',
                    },
                    sourceMap : vars.sourceMap,
                  },
                },
                {
                  loader  : 'sass-loader',
                  options : {
                    sourceMap : vars.sourceMap,
                  },
                },
              ],
            },
            {
              // - do not apply class name hashing
              // - serve as separate files to allow exporting
              test : [ /\.global\.(scss|css)$/ ],
              use  : [
                {
                  loader  : MiniCssExtractPlugin.loader,
                  options : {
                    esModule : false,
                  },
                },
                {
                  loader  : 'css-loader',
                  options : {
                    importLoaders : 1,
                    modules       : false,
                    sourceMap     : vars.sourceMap,
                  },
                },
                {
                  loader  : 'sass-loader',
                  options : {
                    sourceMap : vars.sourceMap,
                  },
                },
              ],
            },
            {
              // - do not apply class name hashing
              test : [ /\.(scss|css)$/ ],
              use  : [
                vars.isDev ? {
                  loader  : MiniCssExtractPlugin.loader,
                  options : {
                    esModule : false,
                  },
                } : {
                  loader  : 'style-loader',
                  options : {
                    insert   : '#insert-css-here',
                    esModule : false,
                  },
                },
                {
                  loader  : 'css-loader',
                  options : {
                    importLoaders : 1,
                    modules       : false,
                    sourceMap     : vars.sourceMap,
                  },
                },
                {
                  loader  : 'sass-loader',
                  options : {
                    sourceMap : vars.sourceMap,
                  },
                },
              ],
            },
            // Process application JS with Babel.
            // The preset includes JSX, Flow, TypeScript, and some ESnext features.
            {
              test    : [ /\.js$/, /\.mjs$/, /\.jsx$/, /\.ts$/, /\.tsx$/ ],
              include : [ paths.src ],
              loader  : 'babel-loader',
              options : {
                sourceMaps     : vars.sourceMap,
                inputSourceMap : vars.sourceMap,

                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory   : true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression : false,
                compact          : vars.isProd,
              },
            },
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
              test    : [ /\.js$/, /\.mjs$/, /\.jsx$/ ],
              exclude : /@babel(?:\/|\\{1,2})runtime/,
              loader  : require.resolve('babel-loader'),
              options : {
                babelrc    : false,
                configFile : true,
                compact    : false,

                cacheDirectory   : true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression : false,

                // Babel sourcemaps are needed for debugging into node_modules
                // code.  Without the options below, debuggers like VSCode
                // show incorrect code and set breakpoints on the wrong lines.
                sourceMaps     : vars.sourceMap,
                inputSourceMap : vars.sourceMap,
              },
            },
            {
              test : /\.(woff(2)?|eot|ttf|otf|)$/,
              type : 'asset/inline',
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude : [ /^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/ ],
              type    : 'asset/resource',
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ].filter(Boolean) as RuleSetRule[],
    },
    plugins : [
      new CleanWebpackPlugin(),
      vars.isDev && new ReactRefreshWebpackPlugin(),
      new PackageJsonGeneratorPlugin({
        buildFolder        : paths.dist,
        currentPackageJson : packageJson,
      }),
      // generate env during webpack build for dev
      // generate env during docker  start for prod
      new EnvGeneratorPlugin({
        filePaths : [
          paths.distEnvGen.replace(paths.dist, ''),
        ],
        env : env.raw,
      }),
      new HtmlWebPackPlugin({
        filename   : 'index.html',
        template   : 'public/index.html',
        inject     : true,
        favicon    : paths.publicFavicon,
        publicPath : paths.publicUrlOrPath,
        minify     : vars.isProd && {
          removeComments                : true,
          collapseWhitespace            : true,
          removeRedundantAttributes     : true,
          useShortDoctype               : true,
          removeEmptyAttributes         : true,
          removeStyleLinkTypeAttributes : true,
          keepClosingSlash              : true,
          minifyJS                      : true,
          minifyCSS                     : true,
          minifyURLs                    : true,
        },
      }),
      new CopyPlugin({
        patterns : [
          paths.publicRobots,
          ...paths.publicCssThemes,
        ].filter(Boolean).map((name) => ({ from: name, to: 'public' })),
      }),
      new CopyPlugin({
        patterns : [
          ...paths.publicFtpIcons,
        ].filter(Boolean).map((name) => ({ from: name.replaceAll('\\', '/'), to: '.' })), // using glob '**' for some reason add 'public' folder
      }),
      new CopyPlugin({
        patterns : [
          ...paths.publicFonts,
        ].filter(Boolean).map((name) => ({ from: name, to: 'public/icons' })),
      }),
      new DefinePlugin(env.stringified),
      vars.isDev && new CaseSensitivePathsPlugin(),
      new WebpackManifestPlugin({
        fileName   : paths.distManifest,
        publicPath : paths.publicUrlOrPath,
      } as Partial<InternalOptions>),
      new ForkTsCheckerWebpackPlugin({
        async      : vars.isDev,
        typescript : {
          build           : true,
          configFile      : paths.tsConfig,
          configOverwrite : {
            compilerOptions : {
            },
          },
          mode : 'write-references',
        },
      }),
      new MiniCssExtractPlugin({
        filename : vars.isDev ? '[name].css' : '[name].[contenthash].css',
        insert   : '#insert-css-here',
      }),
      vars.isProd && new CompressionPlugin(),
      vars.sourceMap && new SourceMapDevToolPlugin({
        filename : '[file].map',
      }),
      vars.analyze && new BundleAnalyzerPlugin(),
    ].filter(Boolean) as WebpackPluginInstance[],

    optimization : {
      sideEffects : false,
      usedExports : true,
      nodeEnv     : process.env.NODE_ENV,
      minimize    : vars.isProd,
      minimizer   : [ new TerserPlugin({
        terserOptions : {
          sourceMap : vars.isDev,
          ecma      : 2020,
        },
      }) ],
    },

    stats : {
      children     : false,
      errorDetails : true,
    },
  };
};

module.exports = configure;
