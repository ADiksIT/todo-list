const path = require('path');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    index: ['@babel/polyfill', './src/index.js'],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              'react-loadable/babel',
            ],
          },
        },
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.module\.(c|s)(a|c|s)s?s$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    nodeEnv: 'development',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new ReactLoadableSSRAddon({
      filename: 'react-loadable-ssr-addon.json',
    }),
    new ExtractCssChunks({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
  ],
};
