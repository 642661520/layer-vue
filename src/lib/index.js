import VueLayer from './vuelayer.vue';
VueLayer.install = function(Vue) {
  Vue.component(VueLayer.name, VueLayer);
};

export default VueLayer;