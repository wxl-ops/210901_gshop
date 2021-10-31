import {reqUserInfo,reqLogout} from '../api'
export default {
  namespaced:true,
  actions:{
    async getUserInfo({commit}){
      const userInfo = await reqUserInfo()
      if (!userInfo.code){
        commit('RECORD_USER',userInfo.data)
      }
    },
    async logout({commit}) {
      const result = await reqLogout()
      if (!result.code){
        commit('RECEIVE_USER_INFO')
      }
    }
  },
  mutations:{
    ['RECORD_USER'](state,userInfo){
      state.userInfo = userInfo
    },
    ['RECEIVE_USER_INFO'](state){
      state.userInfo = {}
    }
  },
  state:{
    userInfo:{}
  }
}
