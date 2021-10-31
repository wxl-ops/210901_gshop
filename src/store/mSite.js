import {reqAddress, reqFoodCategory, reqShops } from '../api'
export default {
  namespaced:true,
  actions:{
    async getAddress(context){
      const result = await reqAddress(`${context.state.latitude},${context.state.longitude}`)
      if(!result.code){
        const address = result.data
        context.commit('RECEIVE_ADDRESS',address)
      }
    },
    async getFoodCategory({commit}){
      const result = await reqFoodCategory()
      if(!result.code){
        const foodCategory = result.data
        commit('RECEIVE_CATEGORIES',foodCategory)
      }
    },
    async getShops({state,commit}){
      const result = await reqShops(state.longitude,state.latitude)
      if(!result.code){
        const shops = result.data
        commit('RECEIVE_SHOPS',shops)
      }
    }
  },
  mutations:{
    RECEIVE_ADDRESS(state,address){
      state.address = address
    },
    RECEIVE_CATEGORIES(state,foodCategory){
      state.foodCategory = foodCategory
    },
    RECEIVE_SHOPS(state,shops){
      state.shops = shops
    },
  },
  getters:{

  },
  state:{
    latitude: "40.10038",
    longitude: "116.36867",
    address:{},
    foodCategory:[],
    shops:[]
  }
}
