module.exports = {
  outputDir: "../docs",
  publicPath:'./',
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
      "highlight.js":'hljs',
    },
  },
  
};
