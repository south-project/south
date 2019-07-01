const dynamicRoutes = [
    {
        path: '/class',
        component: Class,
        name: 'class-manage',
        meta: {
            name: '课程管理',
            icon: 'icon-class'
        },
        children: [
            {
                path: 'Graphic',
                name: 'classGraphic',
                component: classGraphic,
                meta: { 
                    name: '图文课程',
                    isActive:'false'
                },
            },
            {
                path: 'addGraphic/:id',
                name: 'addGraphic',
                component: addGraphic,
                meta: {
                    name: '新增图文',
                    isActive:'true'
                }
            },
            {
                path: 'Audio',
                name: 'classAudio',
                component: classAudio,
                meta: {
                    name: '音频课程',
                    isActive:'false'
                }
            },
            {
                path: 'addAudio/:id',
                name: 'addAudio',
                component: addAudio,
                meta: { 
                    name: '新增音频',
                    isActive:'true'
                }
            },
            {
                path: 'Video',
                name: 'classVideo',
                component: classVideo,
                meta: {
                    name: '视频课程',
                    isActive:'false'
                },
            },
            {
                path: 'addVideo/:id',
                name: 'addVideo',
                component: addVideo,
                meta: {
                    name: '新增视频',
                    isActive:'true'
                },
            },
            {
                path: 'Column',
                name: 'classColumn',
                component: classColumn,
                meta: { 
                    name: '专栏',
                    isActive:'false'
                },
            },
            {
                path: 'Column/editColumn/:id',
                name: 'editColumn',
                component: editColumn,
                meta: {
                    name: '专栏内容管理',
                    isActive:'true'
                },
            },
            {
                path: 'addColumn/:id',
                name: 'addColumn',
                component: addColumn,
                meta: {
                    name: '新增专栏',
                    isActive:'true'
                },
            },
            {
                path: 'Vip',
                name: 'Vip',
                component: Vip,
                meta: {
                    name: '会员',
                    isActive:'false'
                },
            },
            {
                path: 'setVip/:id',
                name: 'setVip',
                component: setVip,
                meta: {
                    name: '会员设置',
                    isActive:'true'
                },
            },
            {
                path: 'Commodity',
                name: 'Commodity',
                component: Commodity,
                meta: {
                    name: '商品分组',
                    isActive:'false'
                },
            },
            {
                path: 'editCommodity/:id',
                name: 'editCommodity',
                component: editCommodity,
                meta: {
                    name: '内容管理',
                    isActive:'true'
                }, 
            },
           
        ]
    },
    {
        path: '/shop',
        component: Shop,
        name: 'shop',
        meta: {
            name: '店铺装修',
            icon: 'icon-shop'
        },
        children: [
            {
                path: 'shopHome',
                name: 'shop-home',
                component: ShopHome,
                meta: {

                    name: '店铺主页',
                    isActive:'false'
                }
            },
            {
                path: 'createShop/:id',
                name: 'createShop',
                component: createShop,
                meta: {
                    name: '编辑',
                    isActive:'true'
                }
            },
            {
                path: 'microPage',
                name: 'microPage',
                component: microPage,
                meta: {
                    name: '微页面',
                    isActive:'false'
                }
            }
        ]
    }
]

export default dynamicRoutes;