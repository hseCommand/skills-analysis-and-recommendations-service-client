const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },

  mode: 'development',
  
  devtool: "source-map",

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
 
  // настройки локального сервера
  devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
};