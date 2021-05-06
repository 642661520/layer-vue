import Vue from 'vue'
import App from './App.vue'
import VueLayer from '@finalsummer/vuelayer'
Vue.config.productionTip = false
Vue.use(VueLayer)
new Vue({
  render: h => h(App),
}).$mount('#app')
