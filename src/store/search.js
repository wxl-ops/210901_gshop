import {reqGetShops} from '../api/index'
export default {
  namespaced:true,
  actions:{
    async searchShop({commit,state}, keyword){
      const geohash = state.latitude + ',' + state.longitude
      const result = await reqGetShops(geohash, keyword)
      if (result) {
        const searchShops = result
        commit('RECEIVE_SEARCH_SHOPS', {searchShops})
      }
    }
  },
  mutations:{
    RECEIVE_SEARCH_SHOPS(state,{searchShops}){
      state.searchShops = searchShops
    },
    CLEAR_SEARCH_SHOPS(state){
      state.searchShops = []
    }
  },
  state:{
    latitude: "40.10038",
    longitude: "116.36867",
    searchShops:[]
  }
}
