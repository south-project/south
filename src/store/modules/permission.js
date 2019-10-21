
import fetchPermission from '../../../static/json/permission.json'
import {
  recursionRouter,
  setDefaultRoute
} from '@/utils/recursion-router'
import router, {
  DynamicRoutes
} from '@/router/index'
import dynamicRouter from '@/router/dynamic-router'
import {
  getPermission
} from '@/api/getData'


export default {
  namespaced: true,
  state: {
    permissionList: null /** 所有路由 */ ,
    sidebarMenu: [] /** 导航菜单 */ ,
    currentMenu: '' /** 当前active导航菜单 */
  },
  getters: {},
  mutations: {
    SET_PERMISSION(state, routes) {
      state.permissionList = routes
    },
    CLEAR_PERMISSION(state) {
      state.permissionList = null
    },
    SET_MENU(state, menu) {
      state.sidebarMenu = menu
    },
    CLEAR_MENU(state) {
      state.sidebarMenu = []
    },
    SET_CURRENT_MENU(state, currentMenu) {
      state.currentMenu = currentMenu
    },
  },
  actions: {
    async FETCH_PERMISSION({
      commit,
      state
    }) {
      // let name = JSON.parse(localStorage.getItem('userInfo')).account
      // let permissionList = await getPermission(name)
      // permissionList = permissionList.data
      let permissionList = JSON.parse(localStorage.getItem('permissionList'))
      // console.log(permissionList)
      //let permissionList = fetchPermission.data
      // /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
      let routes = recursionRouter(permissionList, dynamicRouter)
      let MainContainer = DynamicRoutes.find(v => v.path === '')
      let children = MainContainer.children
      let arr = []
      children.forEach((item, index) => {
        routes.forEach(element => {
          if (item.meta.parentName === element.name) {
            arr.push(item)
          }
        });
      })
      arr = routes.concat(arr)
      /* 生成左侧导航菜单 */
      commit('SET_MENU', arr)

      DynamicRoutes[0].children = arr
      /*  设置第一个路由为默认路由 */
      setDefaultRoute([MainContainer])
      /*  初始路由 */
      let initialRoutes = router.options.routes
      /*  动态添加路由 */
      router.addRoutes(DynamicRoutes)
      /* 完整的路由表 */
      commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
    }
  }
}
