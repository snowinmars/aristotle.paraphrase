const MiniCssExtractPlugin = require('mini-css-extract-plugin')

export const getScssLoadersRules = (dev: boolean) => [
  dev ? {
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
        localIdentName: dev ? "[local]--[hash:base64:5]" : "[hash:base64:8]",
        exportLocalsConvention: "camelCaseOnly",
      },
    }
  },
  "sass-loader",
]
