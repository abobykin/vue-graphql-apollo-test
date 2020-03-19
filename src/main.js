import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import i18n from './i18n'
import './assets/scss/main.scss'
import router from './router'

Vue.config.productionTip = false

new Vue({
  apolloProvider: createProvider(),
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
