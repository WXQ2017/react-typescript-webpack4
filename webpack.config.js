"use strict";
// import config from "./config/config";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const env_config = {
  DEV: "development",
  TEST: "production",
  MASTER: "production"
};
const isEnvDevelopment = env_config[process.env.env] === "development";
const isEnvProduction = env_config[process.env.env] === "production";

console.log(isEnvDevelopment, isEnvProduction)
const publicPath = isEnvProduction ? "/" : isEnvDevelopment && "/";

const shouldUseSourceMap = false;
module.exports = {
  // mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
  mode: "development",
  entry: { app: "./src/app/app.tsx" },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/"
  },
  devServer: {
    // redirect
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/$/,
          to: "/index.html"
        }
      ],
      disableDotRule: true
    },
    host: "127.0.0.1",
    hot: true,
    port: 8088,
    publicPath: publicPath,
    contentBase: path.resolve(__dirname, "dist")
  },
  devtool: "inline-scource-map",
  resolve: {
    alias: {},
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    // unknownContextCritical : false,
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      },
      // TODO
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM"
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,

            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: shouldUseSourceMap
      })
    ],
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles/[name]_[hash].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html", // 生成的html文件名
      template: "./public/index.html", // 依据的模板
      chunks: ["app", "commons"],
      inject: true, //注入的js文件将会被放在body标签中,当值为'head'时，将被放在head标签中
      minify: {
        //压缩配置
        removeComments: true, //删除html中的注释代码
        collapseWhitespace: true, //删除html中的空白符
        removeAttributeQuotes: true //删除html元素中属性的引号
      },
      // chunksSortMode: "dependency" //按dependency的顺序引入
      chunksSortMode: "none"
    }),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: publicPath,
      generate: (seed, files) => {
        const manifestFiles = files.reduce(function(manifest, file) {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        return {
          files: manifestFiles
        };
      }
    })
  ]
};
