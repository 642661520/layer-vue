module.exports = {
  outputDir: "../docs",
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
      "highlight.js":'hljs',
    },
  },
  
};
