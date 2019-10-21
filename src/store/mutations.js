export default {
  //登入
  LOGIN_IN(state, token) {
    state.UserToken = token
  },
  //登出
  LOGIN_OUT(state) {
    state.UserToken = ''
    state.permission.permissionList = ""
    state.permission.currentMenu = ""
    localStorage.clear()
  },
  //切换侧边栏
  toggleNavCollapse(state) {
    state.isSidebarNavCollapse = !state.isSidebarNavCollapse
  },
  onlyCollapse(state, isSidebarNavCollapse) {
    state.isSidebarNavCollapse = isSidebarNavCollapse
  },
  //侧边栏数据
  setCrumbList(state, list) {
    if (list.length === 3) {
      list.splice(1, 1)
    }
    state.crumbList = list
  },
  //
  setCrumbIndex(state, crumbIndex) {
    state.crumbIndex = crumbIndex
  },
  //建筑分类
  setBuildType(state, buildType) {
    state.buildType = buildType
  },
  //管理员角色
  setRoleManage(state, roleList) {
    state.roleList = roleList
  }
}
