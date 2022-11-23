import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入reset.css
import './assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// step1：引入 axios
import Axios from 'axios'
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
