import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import './filters'
import loading from './common/imgs/loading.gif'
import './mock/mockServer'
Vue.component(Button.name,Button)
Vue.use(VueLazyload,{
  loading
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
