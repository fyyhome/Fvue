const path = require('path')
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: __dirname + 'node_modules', loader: "babel-loader", include: __dirname + 'src' }
    ]
  }  
};