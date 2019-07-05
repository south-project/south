import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/login'
import Forbidden from '@/pages/errorPage/403'

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
import BannerManageDetail from '@/pages/bannerManage/editBanner'

import SystemManage from '@/pages/systemManage/systemManage'
//import Login from '@pages/login/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/Login',
    name: 'Login',
    component: Login,
  }]
})

/* 准备动态添加的路由 */
export const DynamicRoutes = [{
    path: '',
    name: 'Home',
    component: Home,
    redirect: 'Estimate',
    meta: {
      requiresAuth: true,
      name: '',
      icon: 'icon-content'
    },
    children: [{
        path: '/BannerManage/EditBanner/:data',
        component: BannerManageDetail,
        name: 'BannerManageDetail',
        meta: {
          name: '添加Banner',
          parentName: 'BannerManage'
        }
      },
      {
        path: '/Estimate/detail',
        component: EstimateDetail,
        name: 'EstimateDetail',
        meta: {
          name: '估算详情',
          parentName: 'Estimate',
          isActive: false
        },
      },
      {
        path: '/UserManage/detail',
        component: UserManageDetail,
        name: 'UserManageDetail',
        meta: {
          name: '用户详情',
          parentName: "UserManage",
          isActive: false
        },
      },
      {
        path: '/BuildManage/detail',
        component: BuildManage,
        name: 'BuildManage',
        meta: {
          name: '建筑分类',
          parentName: 'DataManage',
          isActive: false
        }
      },
      {
        path: '/ConstructionManage/detail/:data',
        component: ConstructionManageDetail,
        name: 'ConstructionManageDetail',
        meta: {
          name: '建筑货值统计',
          parentName: 'ConstructionManage',
          isActive: false
        }
      },
      {
        path: '/DataManage/detail/:data',
        component: DataManageDetail,
        name: 'DataManageDetail',
        meta: {
          name: 'PriceList',
          parentName: 'DataManage',
          isActive: false
        },
      },
      {
        path: '/BuildManage/detail/:data',
        component: BuildManageDetail,
        name: 'BuildManageDetail',
        meta: {
          name: 'buildList',
          parentName: 'DataManage',
          isActive: false
        }
      },
    ]
  },
  {
    path: '/403',
    component: Forbidden
  },
]
