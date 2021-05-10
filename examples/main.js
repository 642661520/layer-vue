import Vue from 'vue'
import App from './App.vue'
import SummerUI from '../src/index'
Vue.use(SummerUI)
// Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
