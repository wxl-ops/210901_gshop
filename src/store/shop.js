import {reqShopInfo,reqShopGoods,reqShopRatings} from '../api/index'
import Vue from 'vue'
export default {
  namespaced:true,
  actions:{
    //获取店铺信息
    async getInfo({commit}){
      const result = await reqShopInfo();
      if(!result.code){
        commit('RECEIVE_SHOP_INFO',result.data)
      }
    },
    //获取食品信息
    async getGoods({commit},callback){
      const result = await reqShopGoods();
      if(!result.code){
        commit('RECEIVE_SHOP_GOODS',result.data);
        callback && callback()
      }
    },
    //获取评价信息
    async getRatings({commit}){
      const result = await reqShopRatings();
      if(!result.code){
        commit('RECEIVE_SHOP_RATINGS',result.data)
      }
    },
    //更新购买食物的状态
    updateFoodCount({commit},{boolean,food}){
      if (boolean){
        commit('ADD_FOOD_COUNT',food)
      }else {
        commit('SUB_FOOD_COUNT',food)
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
    //数目增加
    ADD_FOOD_COUNT(state,food){
      if (!food.count){
        //第一次增加
        Vue.set(food,'count',1);
        state.foodCount.push(food);
      }else {
        food.count++;
      }
    },
    // 数目减少
    SUB_FOOD_COUNT(state,food){
      //有值才能做减法
      if (food.count){
        food.count--;
        //当count为0，要把这个食物在数组中删除
        if (food.count === 0){
          state.foodCount.splice(state.foodCount.indexOf(food),1)
        }
      }
    }
  },
  getters:{
    totalCount(state){
      return  state.foodCount.reduce((preTotal, food) => preTotal + food.count, 0)
    },
    totalPrice(state){
      return state.foodCount.reduce((prePrice,food) => prePrice + food.count*food.price, 0)
    }
  },
  state:{
    info:{},
    goods:[],
    ratings:[],
    foodCount:[]
  }
}
