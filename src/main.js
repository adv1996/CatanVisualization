import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

Vue.config.productionTip = false
Vue.use(VueRx, Rx)
new Vue({
  render: h => h(App),
}).$mount('#app')
