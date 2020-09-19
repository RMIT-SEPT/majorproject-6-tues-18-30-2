const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      'history'
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    filename: env === 'production' ? '[name].[hash].js' : 'bundle.js',
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
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
});
