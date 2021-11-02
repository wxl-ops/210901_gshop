import {reqShopInfo,reqShopGoods,reqShopRatings} from '../api/index'
export default {
  namespaced:true,
  actions:{
    async getInfo({commit}){
      const result = await reqShopInfo();
      if(!result.code){
        commit('RECEIVE_SHOP_INFO',result.data)
      }
    },
    async getGoods({commit}){
      const result = await reqShopGoods();
      if(!result.code){
        commit('RECEIVE_SHOP_GOODS',result.data)
      }
    },
    async getRatings({commit}){
      const result = await reqShopRatings();
      if(!result.code){
        commit('RECEIVE_SHOP_RATINGS',result.data)
      }
    }
  },
  mutations:{
    RECEIVE_SHOP_INFO(state,shopInfo){
      state.info = shopInfo
    },
    RECEIVE_SHOP_GOODS(state,shopGoods){
      state.goods = shopGoods
    },
    RECEIVE_SHOP_RATINGS(state,shopRatings){
      state.ratings = shopRatings
    },
  },
  state:{
    info:{},
    goods:[],
    ratings:[]
  }
}
