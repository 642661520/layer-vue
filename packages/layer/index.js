import VueLayer from './src/VueLayer.vue'

// 为组件提供 install 安装方法，供按需引入
/* istanbul ignore next */
VueLayer.install = function(Vue) {
  Vue.component(VueLayer.name, VueLayer);
};

export default VueLayer;