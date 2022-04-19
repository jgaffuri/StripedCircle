// dev
const path = require("path");

const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "stripedcircle.js",
    publicPath: "build/",
    library: "gviz",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "build")
  },
  node: {
    fs: "empty"
  },
  plugins: [new LiveReloadPlugin()],
  watch: true,
  devtool: "inline-source-map"
};
