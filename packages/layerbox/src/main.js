import Vue from 'vue';
import layerVue from './main.vue';
const LayerBoxConstructor = Vue.extend(layerVue);



const showNextMsg = () => {
  initInstance();
};
const LayerBox = function(options, callback) {
  showNextMsg();
};
LayerBox.open = (options) => {
  let instance = new LayerBoxConstructor({data:options});
  instance.vm = instance.$mount();
  if (document.querySelector('#app')) {
    document.querySelector('#app').appendChild(instance.vm.$el);
  } else {
    document.body.appendChild(instance.vm.$el);
  }
};
export default LayerBox;
export { LayerBox };