import App from './App.vue'
import LayerVue from '../src/index'
import './index.css'
Vue.use(LayerVue, { zindex: 200, skin: { title: { color: '#0f0', } } })
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
