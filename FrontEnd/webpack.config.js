const dotenv = require('dotenv');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// call dotenv and it will return an Object with a parsed key 
const env = dotenv.config().parsed;
  
// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = env => ({
  mode: env === 'production' ? 'production' : 'development',
  entry: {
    main: './src/index.tsx',
    vendor: [
			'react',
      'react-dom',
      'react-router-dom',
      'react-day-picker',
      'antd',
			'typestyle',
      'history',
      'formik'
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: env === 'production' ? '[name].[hash].js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'vendor',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })

  ]
});
