// Define functionality of webpack
const path = require('path');

const config = {
  // Entry point for bundling the app
  entry: ['@babel/polyfill', './src/index.js'],
  // Location where the bundled code will be solved - resolve generate absolute dir
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  // Start dev-server at port 3000 and automatically refresh the page when changes are made
  //  Instead of bundling into file, code is bundled in memory
  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000
  },
  // Generate a source map for the bundle to track errors to original source code
  devtool: 'source-map',
  module: {
    rules: [
      // Loader to transpile JSX code into regular JS
      {
        test: /\.js$/, // for files with .js extension
        loader: 'babel-loader', // processing done with 'babel-loader'
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'] // groups of pre-configured plugins
        }
      },
      {
        // css and style loaders: to generate and inject a style element that 
        //  contains all of the styles of the application
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

// Export using Node's module syntax
module.exports = config;