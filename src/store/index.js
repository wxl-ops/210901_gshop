import Vue from 'vue'
import Vuex from 'vuex'
import mSite from './mSite'
import login from './login'
import shop from './shop'
import search from './search'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    mSite,
    login,
    shop,
    search
  }
})
