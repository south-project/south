import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import modules from './modules'
import actions from './actions'
import mutations from './mutations'
import createPersistedState from "vuex-persistedstate"
console.log(modules)
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        // 列表
        buildType: val.buildType,
        //token
        UserToken: val.UserToken,
        //系统设置
        crumbIndex: val.crumbIndex
      }
    }
  })]
})

export default store
