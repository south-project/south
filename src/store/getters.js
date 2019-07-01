export default {
    //状态栏切换
    getCollapse(state){
        return state.isSidebarNavCollapse;
    },
    //获取视频ID
    getVideoId(state){
        return state.VideoId
    },
    //获取视频上传状态
    getVideoStatus(state){
        return state.uploadStatus
    }
}
