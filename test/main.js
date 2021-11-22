import App from './App.vue'
import LayerVue from '../packages/src/index'
Vue.use(LayerVue, { log: false,title:'test'})
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
