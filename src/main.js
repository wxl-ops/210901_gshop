import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
Vue.component(Button.name,Button)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
