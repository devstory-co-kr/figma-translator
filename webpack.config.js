const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");

module.exports = (env, argv) => ({
  mode: argv.mode === "production" ? "production" : "development",

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === "production" ? false : "inline-source-map",
  entry: {
    code: "./src/code.ts", // This is the entry point for our plugin code.
    createTemplates: "./src/ui/create_templates/index.js",
  },
  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === "code"
        ? "code.js"
        : "[name].[contenthash].js";
    },
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
  plugins: [
    new webpack.DefinePlugin({
      global: {}, // Fix missing symbol error when running in developer VM
    }),
    new HtmlWebpackPlugin({
      template: "./src/ui/create_templates/index.html",
      filename: "ui/create_templates.html",
      chunks: ["createTemplates"],
    }),
    new HtmlInlineScriptPlugin({
      htmlMatchPattern: [/.html$/],
      scriptMatchPattern: [/.js$/],
    }),
  ],
});
