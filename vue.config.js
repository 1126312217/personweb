const { defineConfig } = require("@vue/cli-service");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // before: require("./mock/index.js"),
    host: "localhost",
    port: 8080,
    open: true,
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    optimization: {
      splitChunks: {
        chunks: 'all', // 三选一： "initial" | "all"(推荐) | "async" (默认就是async)
      }
    }
  },
});