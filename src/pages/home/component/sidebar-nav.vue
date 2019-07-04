<template>
    <el-menu
        :collapse="isSidebarNavCollapse"
        :default-active="currentMenu"
        :unique-opened="true"
        @select="handleSeclect">
         <div class="nav__top" @click="toggleNav">
            南方设计
        </div>
    <!-- <div class="toggle" @click="toggleNav"><span class="iconfont icon-nav"></span></div> -->
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>  
    </el-menu>
</template>

<script>  
import { mapState } from 'vuex'
import DynamicMenu from '@/components/dynamic-menu'
import permission from '../../../../static/json/permission' 
export default {
    components:{
        DynamicMenu
    },
    data() {
        return {
            isCollapse: true,
            screenWidth: document.body.clientWidth,
            sideJson:permission,
            menuList:[
                
            ]
        }
    },
    computed: {
        ...mapState(['isSidebarNavCollapse']),
        ...mapState('permission', ['sidebarMenu', 'currentMenu'])
    },
    beforeMount(){
       //this.sidebarMenu.splice(0,1)
    },
    mounted(){
        const that = this
        //監聽側邊欄
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth 
                that.screenWidth = window.screenWidth
            })()
        }
        if(that.screenWidth<1000){
            that.$store.commit('onlyCollapse',true)
        }else{
            that.$store.commit('onlyCollapse',false)
        }
    },
    watch:{
        currentMenu(val){
            //console.log(val)
        },
        screenWidth(val){
            // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
            if(!this.timer){
                // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function(){
                    // 打印screenWidth变化的值
                    if(that.screenWidth<1000){
                        that.$store.commit('onlyCollapse',true)
                    }else{
                        that.$store.commit('onlyCollapse',false)
                    }
                    that.timer = false
                },400)
            }
        }
    },
    methods: {
        toggleNav(){this.$store.commit('toggleNavCollapse')},//切換側邊欄
        handleSeclect(e){},
    },
}
</script>
<style scoped lang="scss">
@import '../../../styles/_mixin';
.toggle{
    @include wh(160px,40px);
    background: #f1f7ff;
    line-height: 40px;
    text-align: center;
    color:$blue;
    font-size: 20px;
}
.nav__top{
    width: 160px;
    height: 50px;
    line-height: 50px;
    background-color: $blue;
    text-align: center;
    color: #fff;
    transition: all 300ms;
}
</style>

