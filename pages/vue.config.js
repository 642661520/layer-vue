module.exports = {
  outputDir: "../docs",
  publicPath:'/layer-vue',
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
      "highlight.js":'hljs',
    },
  },
  
};
