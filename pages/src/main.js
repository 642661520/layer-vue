import Vue from "vue";
import App from "./App.vue";
// import LayerVue from "layer-vue";
// import "./assets/packages/theme/css/index.css";
import LayerVue from '../../src/index';
import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// import hljs from "highlight.js";
// import "highlight.js/styles/ir-black.css";
import router from "./router";
import store from "./store";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import Clipboard from 'v-clipboard'
Vue.use(Clipboard);
Vue.use(mavonEditor);
// Vue.use(hljs.vuePlugin);
Vue.use(ElementUI);
Vue.use(LayerVue,{zIndex:2000});
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
