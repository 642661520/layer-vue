import Vue from 'vue'
import App from './App.vue'
import SummerUI from '../src/index'
// import './index.css'
Vue.use(SummerUI,{zindex:200})
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
