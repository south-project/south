import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/login'

import Home from '@/pages/home/home'
import Estimate from '@/pages/estimate/estimate'
import EstimateDetail from '@/pages/estimate/estimateDetail'
import UserManage from '@/pages/userManage/userManage'
import UserManageDetail from '@/pages/userManage/userManageDetail'
import DataManage from '@/pages/dataManage/dataManage'
import DataManageDetail from '@/pages/dataManage/dataManageDetail'
import BuildManage from '@/pages/dataManage/buildManage'
import BuildManageDetail from '@/pages/dataManage/buildManageDetail'
import ConstructionManage from '@/pages/constructionManage/constructionManage'
import ConstructionManageDetail from '@/pages/constructionManage/constructionManageDetail'
import CarManage from '@/pages/constructionManage/carManage'
import BannerManage from '@/pages/bannerManage/bannerManage'
import EditBanner from '@/pages/bannerManage/editBanner'

import SystemManage from '@/pages/systemManage/systemManage'
//import Login from '@pages/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: 'Estimate', 
      meta: {
        requiresAuth: true,
        name: '',
        icon: 'icon-content'
      },
      children:[
        {
          path:'/Estimate',
          component: Estimate,
          name:'Estimate',
          meta:{
            name: '估值记录',
            icon: 'icon-content'
          },
        },
        {
          path:'/Estimate/detail',
          component: EstimateDetail,
          name:'EstimateDetail',
          meta:{
            name: '估值详情',
            icon: 'icon-content'
          },
        },
        {
          path:'/UserManage',
          component: UserManage,
          name:'UserManage',
          meta:{
            name: '用户管理',
            icon: 'icon-content'
          },
        },
        {
          path:'/UserManage/detail',
          component: UserManageDetail,
          name:'UserManageDetail',
          meta:{
            name: '用户详情',
            icon: 'icon-content'
          },
        },
        {
          path:'/DataManage',
          component: DataManage,
          name:'DataManage',
          meta:{
            name: '均价数据库',
            icon: 'icon-content'
          }
        },
        {
          path:'/DataManage/detail/:data',
          component: DataManageDetail,
          name:'DataManageDetail',
          meta:{
            name: 'list',
            icon: 'icon-content'
          },
        },
        {
          path:'/BuildManage',
          component: BuildManage,
          name:'BuildManage',
          meta:{
            name: '建筑分类',
            icon: 'icon-content'
          }
        },
        {
          path:'/BuildManage/detail/:data',
          component: BuildManageDetail,
          name:'BuildManageDetail',
          meta:{
            name: '建筑分类',
            icon: 'icon-content'
          }
        },
        {
          path:'/ConstructionManage',
          component: ConstructionManage,
          name:'ConstructionManage',
          meta:{
            name: '建筑货值统计',
            icon: 'el-icon-office-building'
          }
        },
        {
          path:'/ConstructionManage/detail/:data',
          component: ConstructionManageDetail,
          name:'ConstructionManageDetail',
          meta:{
            name: '建筑货值统计',
            icon: 'el-icon-office-building'
          }
        },
        {
          path:'/CarManage',
          component: CarManage,
          name:'CarManage',
          meta:{
            name: '车位货值统计',
            icon: 'el-icon-truck'
          }
        },
        {
          path:'/BannerManage',
          component: BannerManage,
          name:'BannerManage',
          meta:{
            name: 'banner管理',
            icon: 'el-icon-money'
          }
        },
        {
          path:'/BannerManage/EditBanner/:data',
          component: EditBanner,
          name:'EditBanner',
          meta:{
            name: '添加Banner',
            icon: 'el-icon-money'
          }
        },
        {
          path:'/SystemManage',
          component: SystemManage,
          name:'SystemManage',
          meta:{
            name: '系统设置',
            icon: 'el-icon-setting'
          }
        },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
  ]
})
