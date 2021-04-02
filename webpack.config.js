const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    liveReload: true
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        }
      ]
    }),

    new webpack.DefinePlugin({
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common'
    },
  }
}
