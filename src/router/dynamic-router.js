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

/* 需要权限判断的路由 */
/* isActive为true时不在侧边栏显示 */
const dynamicRoutes = [{
    path: '/Estimate',
    component: Estimate,
    name: 'Estimate',
    meta: {
      name: '估算记录',
      icon: 'el-icon-pie-chart',
      isActive: true
    },
  },
  {
    path: '/UserManage',
    component: UserManage,
    name: 'UserManage',
    meta: {
      name: '用户管理',
      icon: 'el-icon-user',
      isActive: true
    },
  },
  {
    path: '/DataManage',
    component: DataManage,
    name: 'DataManage',
    meta: {
      name: '均价数据库',
      icon: 'el-icon-copy-document',
      isActive: true
    },
  },

  {
    path: '/ConstructionManage',
    component: ConstructionManage,
    name: 'ConstructionManage',
    meta: {
      name: '建筑货值统计',
      icon: 'el-icon-office-building',
      isActive: true
    }
  },
  {
    path: '/CarManage',
    component: CarManage,
    name: 'CarManage',
    meta: {
      name: '车位货值统计',
      icon: 'el-icon-truck',
      isActive: true
    }
  },
  {
    path: '/BannerManage',
    component: BannerManage,
    name: 'BannerManage',
    meta: {
      name: 'banner管理',
      icon: 'el-icon-picture-outline',
      isActive: true
    }
  },
  {
    path: '/SystemManage',
    component: SystemManage,
    name: 'SystemManage',
    meta: {
      name: '系统设置',
      icon: 'el-icon-setting',
      isActive: true
    }
  },

]

export default dynamicRoutes
