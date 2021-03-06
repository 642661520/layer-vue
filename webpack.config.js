var path = require("path");
var webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./test/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./docs")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          transformToRequire: {
            img: "src",
            image: "xlink:href",
            source: "src"
          },
          loaders: {
            css: ExtractTextPlugin.extract({
              use: "css-loader",
              fallback: "vue-style-loader"
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./packages/index.html"
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  (module.exports.entry = "./packages/src/index.js"),
    (module.exports.output = {
      path: path.resolve(__dirname, "./lib"),
      publicPath: "/lib/",
      filename: "layer-vue.js",
      library: "LayerVue", // library指定的就是你使用require时的模块名，这里便是require("LayerVue")
      libraryTarget: "umd", //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
      umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
    }),
    (module.exports.devtool = "#none");
  module.exports.module.rules[0] = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: "vue-style-loader",
      use: "css-loader"
    })
  };
  module.exports.plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin("index.css")
  ];
}
