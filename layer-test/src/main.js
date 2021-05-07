import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLayer from '@finalsummer/vuelayer'
Vue.config.productionTip = false
Vue.use(VueLayer)
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
