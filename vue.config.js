module.exports = {
  runtimeCompiler: true,
  outputDir: "dist/static",
  publicPath: process.env.NODE_ENV === "production" ? "static" : "/",
  devServer: {
    // proxy: "https://developer.normcore.com",
    proxy: "https://excalibur.gaiyadata.com"
  }
}
