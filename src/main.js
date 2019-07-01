// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import './styles/index.scss'
//import './styles/index.scss' 

import * as globalFilter from './filters/filters'

Object.keys(globalFilter).forEach(key => {
    Vue.filter(key, globalFilter[key])
})
Vue.config.productionTip = false
Vue.use(ElementUI)

router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)
})

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router,
  store,
  components: { App },
  template: '<App/>'
})
