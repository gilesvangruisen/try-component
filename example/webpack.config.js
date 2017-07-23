module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  entry:  __dirname + '/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};
