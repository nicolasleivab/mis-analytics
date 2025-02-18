const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Absolute path to your project root
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

module.exports = {
  entry: path.resolve(PROJECT_ROOT, 'application', 'index.tsx'),
  output: {
    path: path.resolve(PROJECT_ROOT, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(PROJECT_ROOT, 'tsconfig.json'),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // Don't rewrite paths for css image urls.
              url: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(
        PROJECT_ROOT,
        'infrastructure',
        'public',
        'index.html'
      ),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(PROJECT_ROOT, 'infrastructure', 'public'),
          to: 'public',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  devServer: {
    static: path.resolve(PROJECT_ROOT, 'dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '4000',
  },
};
