const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: ['@babel/polyfill', './src/server/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build-server'),
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  externals: [webpackNodeExternals()],
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
        test:  /\.json$/,
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

    ],
  },
};
