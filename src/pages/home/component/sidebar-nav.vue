<template>
    <el-menu
        :collapse="isSidebarNavCollapse"
        :default-active="currentMenu"
        :unique-opened="true"
        @select="handleSeclect">
         <div class="nav__top">
            南方设计
        </div>
    <!-- <div class="toggle" @click="toggleNav"><span class="iconfont icon-nav"></span></div> -->
        <template v-for="v in menuList">
            <el-submenu :index="v.name" @mouseover.native="selectStyle(v.name)" @mouseout.native="outStyle($event)" 
          v-if="v.children&&v.children.length>0" :key="v.name">
                <template slot="title">
                    <i class="iconfont" :class="v.meta.icon"></i>
                    <span>{{v.meta.name}}</span> 
                </template>
                <el-menu-item-group>
                    <el-menu-item  v-for="item in v.children" :key="item.name" :index="item.name" @click="gotoRoute(item.name)" >
                        <span slot="title" >{{item.meta.name}}</span>
                    </el-menu-item>
                    <el-menu-item  :key="v.name" :index="v.name" @click="gotoRoute(v.name)" >
                        <span slot="title" >{{v.meta.name}}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item :key="v.name" :index="v.name" @click="gotoRoute(v.name)" v-else>
                <i :class="v.meta.icon"></i>
                <span slot="title" >{{v.meta.name}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>  
import { mapState } from 'vuex'
export default {
     
    data() {
        return {
            isCollapse: true,
            screenWidth: document.body.clientWidth,
            menuList:[
                {
                    "path": '/Estimate',
                    "component": "Estimate",
                    "name": 'Estimate',
                    "meta": {
                        "name": '估算记录',
                        "icon": 'el-icon-pie-chart'
                    },
                },
                {
                    "path": '/UserManage',
                    "component": "UserManage",
                    "name": 'UserManage',
                    "meta": {
                        "name": '用户管理',
                        "icon": 'el-icon-user'
                    },
                },
                {
                    "path": '/DataManage',
                    "component": "DataManage",
                    "name": 'DataManage',
                    "meta": { 
                        "name": '均价数据库',
                        "icon": 'el-icon-data-line'
                    },
                    "children":[
                         {
                            "path": '/BuildManage',
                            "component": "BuildManage",
                            "name": 'BuildManage',
                            "meta": { 
                                "name": '建筑分类',
                                "icon": 'el-icon-s-data'
                            },  
                        },
                    ]
                },
                {
                    "path": '/ConstructionManage',
                    "component": "ConstructionManage",
                    "name": 'ConstructionManage',
                    "meta": {
                        "name": '建筑货值统计',
                        "icon": 'el-icon-office-building'
                    },
                },
                {
                    "path": '/CarManage',
                    "component": "CarManage",
                    "name": 'CarManage',
                    "meta": {
                        "name": '车位货值统计',
                        "icon": 'el-icon-truck'
                    },
                },
                {
                    "path": '/BannerManage',
                    "component": "BannerManage",
                    "name": 'BannerManage',
                    "meta": {
                        "name": 'banner管理',
                        "icon": 'el-icon-money'
                    },
                },
                {
                    "path": '/SystemManage',
                    "component": "SystemManage",
                    "name": 'SystemManage',
                    "meta": {
                        "name": '系统设置',
                        "icon": 'el-icon-setting'
                    },
                },
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
    mounted(){
        //console.log(this.menuList)
    },
    methods: {
        toggleNav(){this.$store.commit('toggleNavCollapse')},//切換側邊欄
        handleSeclect(e){},
        gotoRoute(name) {
            this.$router.push({ name })
        }, 
        //切换侧边栏状态
        selectStyle(e){
            this.select = e;
        },
        outStyle(e){
            this.select = null;
        }
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
}
</style>

