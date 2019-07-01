export default {
    LOGIN_IN(state,token) {
        state.UserToken = token
    },
    LOGIN_OUT(state) {
        state.UserToken = ''
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse 
    },
    onlyCollapse(state,isSidebarNavCollapse){
        state.isSidebarNavCollapse = isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
    },
    setCrumbIndex(state,crumbIndex){
        state.crumbIndex = crumbIndex
    }
}
