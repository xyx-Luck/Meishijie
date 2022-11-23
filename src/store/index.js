import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userInfo:{}//用户信息
  },
  getters: {
  },
  mutations: {
      setUserInfo(state,userInfo){//修改用户信息
         state.userInfo=userInfo;
      }
  },
  actions: {
  },
  modules: {
  }
})
