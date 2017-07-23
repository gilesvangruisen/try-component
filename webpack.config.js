module.exports = {
  entry:  __dirname + '/src/try-component.js',
  output: {
    path: __dirname + '/dist/',
    publicPath: __dirname + '/example/',
    filename: 'try-component.js',
    libraryTarget: 'umd'
  }
};
