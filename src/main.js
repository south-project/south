
import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import './styles/index.scss'

import * as globalFilter from './filters/filters'

Object.keys(globalFilter).forEach(key => {
    Vue.filter(key, globalFilter[key])
})
Vue.config.productionTip = false
Vue.use(ElementUI)
//路由守卫
router.beforeEach((to, from, next) => { 
  if (!store.state.permission.permissionList) {
    store.dispatch('permission/FETCH_PERMISSION').then(() => {
        next({ path: to.path })
      })
  } else {
      if (to.path !== '/login') {
          next()  
      } else {
          next(from.fullPath)
      }
  }
})


router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  //store.commit('permission/SET_CURRENT_MENU', to.name.split("Detail")[0])
})

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router,
  store,
  components: { App },
  template: '<App/>'
})
