// import VueLayer from './vuelayer.vue'
// let index = {}
// index.install = function (Vue, options) {
//   Vue.prototype.$msg = 'Hello I am index.js'
//   Vue.prototype.$myMethod = function (arr) {
//     if (arr.length < 0) {
//       return false
//     } else {
//       arr = arr.join('连接你我')
//       return arr
//     }
//   }
//   Vue.component(VueLayer.name, VueLayer) // indexPanel.name 组件的name属性
// }
// export default index
import VueLayer from './vuelayer.vue';

/* istanbul ignore next */
VueLayer.install = function(Vue) {
  Vue.component(VueLayer.name, VueLayer);
};

export default VueLayer;