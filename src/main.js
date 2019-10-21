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
  console.log(store)
  if (!store.state.UserToken) {
    if (
      to.matched.length > 0 &&
      !to.matched.some(record => record.meta.requiresAuth)
    ) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    if (!store.state.permission.permissionList) {
      store.dispatch('permission/FETCH_PERMISSION').then(() => {
        let path = ''
        if (from.name == 'Login') {
          path = store.state.permission.sidebarMenu[0].name
        } else {
          path = to.path
        }
        next({
          path: path
        })
      })
    } else {
      if (to.path !== '/login') {
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})

router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)
  // if (to.name != 403) {
  //   let name = to.name.split("Detail")[0]
  //   if (name == 'BuildManage') {
  //     name = "DataManage"
  //   }
  //   store.commit('permission/SET_CURRENT_MENU', name)
  // }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
