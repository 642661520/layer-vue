import Vue from 'vue'
import App from './App.vue'
import SummerUI from '../src/index'
import './index.css'
Vue.use(SummerUI, { zindex: 200, skin: { title: { color: '#0f0', } } })
console.log(SummerUI,Vue.prototype);

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
