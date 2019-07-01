import fetch from '../config/fetch'

/**
 *  开启关闭信息采集(通用) modeType:1-图文,2-音频 ,3-视频
 */
export const toggleInformation = (
    isGetInformation,modeId,modeType,attrIdList
    ) => fetch('/admin/sys-user-attr/saveGtherAttrBySetting',{isGetInformation,modeId,modeType,attrIdList},'POST')  
/**
 * 查询信息采集属性接口(通用) type:1-图文,2-音频 ,3-视频,4-专栏
 */
export const findInformationList = (modelId,type) => fetch('/admin/sys-user-attr/findGatherUserList',{modelId,type},'GET')
 /**
 * 上架,下架图文课程列表
 */
export const upperOrShelves = (id,status) => fetch('/admin/zsff-subject-article/upperOrShelves',{id,status},'GET')    
/**
 * 删除图文课程列表
 */
export const deleteAticleItem = (id) => fetch('/admin/zsff-subject-article/delete',{id},'GET') 
 /**
 * 获取编辑图文课程列表详情
 */
export const editAticle = (id) => fetch('/admin/zsff-subject-article/get',{id},'GET') 
 /**
 * 更新编辑图文课程列表
 */
export const updateAticle= (
    columnIds,
    contentDetail,
    contentIntroduce,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId
) => fetch('/admin/zsff-subject-article/update',{
    columnIds,
    contentDetail,
    contentIntroduce,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId
},'POST')     
/**
 * 新增图文课程
 */
export const addAticle = (
    columnIds,
    contentDetail,
    contentIntroduce,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId
) => fetch('/admin/zsff-subject-article/insert',{
    columnIds,
    contentDetail,
    contentIntroduce,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId
},'POST')
/**
 * 音频课程列表
 */
export const audioList = (
    current,storeId,size,name,status
    ) => fetch('/admin/zsff-subject-audio/list',{current,storeId,size,name,status},'POST')
 /**
 * 上架,下架音频课程列表
 */
export const upperAudioShelves = (id,status) => fetch('/admin/zsff-subject-audio/upperOrShelves',{id,status},'GET')    
/**
 * 删除音频课程列表
 */
export const deleteAudioItem = (id) => fetch('/admin/zsff-subject-audio/delete',{id},'GET')     
/**
 * 获取编辑图文课程列表详情
 */
export const editAudio = (id) => fetch('/admin/zsff-subject-audio/get',{id},'GET') 
/**
 * 添加音频课程
 */
export const addAudio = (
   
    columnIds,
    contentDetail,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId,
    audio,
) => fetch('/admin/zsff-subject-audio/insert',{
    columnIds,
    contentDetail,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId,
    audio,
},'POST')
/**
 * 更新编辑音频课程列表
 */
export const updateAudio = (
    columnIds,
    contentDetail,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId,
    video,
    videoCover
) => fetch('/admin/zsff-subject-audio/update',{
    columnIds,
    contentDetail,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId,
    video,
    videoCover
},'POST')
/**
 * 视频课程列表
 */
export const videoList = (
    current,storeId,size,name,status
    ) => fetch('/admin/zsff-subject-video/list',{current,storeId,size,name,status},'POST')
 /**
 * 获取编辑视频课程列表详情
 */
export const editVideo = (id) => fetch('/admin/zsff-subject-video/get',{id},'GET') 
/**
 * 上架,下架视频课程列表
 */
export const upperVideoShelves = (id,status) => fetch('/admin/zsff-subject-video/upperOrShelves',{id,status},'GET') 
/**
 * 删除视频课程列表
 */
export const deleteVideoItem = (id) => fetch('/admin/zsff-subject-video/delete',{id},'GET')       
/**
 * 添加视频课程
 */
export const addVideo = (
    columnIds,
    contentDetail,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId,
    video,
    videoCover
) => fetch('/admin/zsff-subject-video/insert',{
    columnIds,
    contentDetail,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId,
    video,
    videoCover
},'POST')
/**
 * 更新编辑视频课程列表
 */
export const updateVideo = (
    columnIds,
    contentDetail,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId,
    video,
    videoCover
) => fetch('/admin/zsff-subject-video/update',{
    columnIds,
    contentDetail,
    cover,
    groupIds,
    id,
    isCopy,
    isDuplicate,
    name,
    originalPrice,
    price,
    sellingMode,
    shelfTime,
    status,
    storeId,
    video,
    videoCover
},'POST')

/**
 * 专栏列表
 */
export const getColumnList = (current,storeId,size,name,status) => fetch('/admin/zsff-column/list',{current,storeId,size,name,status},'POST')      
/**
 * 课程获取专栏列表
 */
export const aticleColumn = (subjectId,type) => fetch('/admin/zsff-column/listBySubject',{subjectId,type},'GET')
/**
 * 上架,下架专栏列表
 */
export const upperColumnShelves = (id,status) => fetch('/admin/zsff-column/upperOrShelves',{id,status},'GET') 
/**
 * 删除专栏列表
 */
export const deleteColumnItem = (id) => fetch('/admin/zsff-column/delete',{id},'GET') 
/**
 * 专栏排序
 */
export const ColumnSort = (id,sort) => fetch('/admin/zsff-column/sort',{id,sort},'GET')  
/**
 * 专栏下课程排序
 */
export const ColumnClassSort = (subjectId,sort,type) => fetch('/admin/zsff-column-subject/sort',{subjectId,sort,type},'GET')  
 /**
 * 获取专栏列表详情
 */
export const editColumn = (id) => fetch('/admin/zsff-column/get',{id},'GET') 
/**
 * 添加专栏
 */
export const addColumn = (
    columnSubjectAddList,
    content,
    cover,
    groupIds,
    introduce,
    name,
    originalPrice,
    price,
    sellingMode,
    status,
    storeId,
) => fetch('/admin/zsff-column/insert',{
    columnSubjectAddList,
    content,
    cover,
    groupIds,
    introduce,
    name,
    originalPrice,
    price,
    sellingMode,
    status,
    storeId,
},'POST')    
/**
 * 更新专栏
 */
export const updateColumn = (
    content,
    cover,
    groupIds,
    id,
    introduce,
    list,
    name,
    originalPrice,
    price,
    sellingMode,
    status,
    storeId,
) => fetch('/admin/zsff-column/update',{
    content,
    cover,
    groupIds,
    id,
    introduce,
    list,
    name,
    originalPrice,
    price,
    sellingMode,
    status,
    storeId,
},'POST')   
/**
 * 获取会员信息
 */
export const vipList = (storeId) => fetch('/admin/store-vip/getVip',{storeId},'GET')  
/**
 * 获取会员详情
 */
export const vipDetail = (vipId) => fetch('/admin/store-vip/getVipDetail',{vipId},'GET')  
/**
 * 会员未关联商品列表
 */
export const vipProd = (current,prodIds,prodName,prodType,size,vipId) => fetch('/admin/store-vip/listProd',{current,prodIds,prodName,prodType,size,vipId},'POST')  
/**
 * 会员已关联商品列表
 */
export const vipProdList = (current,prodIds,prodName,prodType,size,vipId) => fetch('/admin/store-vip/listVipProd',{current,prodIds,prodName,prodType,size,vipId},'POST')  
/**
 * 移除会员关联商品列表
 */
export const removeVipProd = (id) => fetch('/admin/store-vip/removeProd',{id},'GET')   
/**
 * 更新会员
 */
export const updateVip = (
    attr,
    cover,
    discount,
    equityIntro,
    isDiscount,
    isFree,
    name,
    prod,
    storeId,
    useIntro,
    vipIntro,
    id,
    ) => fetch('/admin/store-vip/updateVip',{
        attr,
        cover,
        discount,
        equityIntro,
        isDiscount,
        isFree,
        name,
        prod,
        storeId,
        useIntro,
        vipIntro,
        id,
    },'POST') 
/**
 * 更新会员(添加权益商品)
 */
export const updateVipList = (
    id,
    prod, 
    ) => fetch('/admin/store-vip/updateVip',{
        id,
        prod, 
    },'POST') 
   
/**
 * 商品分组列表
 */
export const commodityList = (
    current,storeId,size,name,status
    ) => fetch('/admin/store-group/listGroup',{current,storeId,size,name,status},'POST')
/**
 * 内容管理分组列表
 */
export const commodityGroupList = (
    groupId,prodName,prodType
    ) => fetch('/admin/store-group/listGroupProd',{groupId,prodName,prodType},'POST')
/**
 * 删除商品分组
 */
export const deleteCommodityItem = (id) => fetch('/admin/store-group/deleteGroup',{id},'GET')   
/**
 * 移除分组商品
 */
export const deleteCommodityGroupItem = (id) => fetch('/admin/store-group/removeGroupProd',{id},'GET')   
/**
 * 编辑分组名称
 */
export const updateCommodityName = (id,name,storeId) => fetch('/admin/store-group/updateGroup',{id,name,storeId},'POST') 
/**
 * 商品分组未关联商品列表
 */
export const storeCommodityGroup = (current,groupId,prodName,prodType) => fetch('/admin/store-group/listProd',{current,groupId,prodName,prodType},'POST')
/**
 * 添加商品到分组
 */
export const addGroupList = ( 
   prods
    ) => fetch('/admin/store-group/addGroupProd',prods,'POST') 
/**
 * 商品分组更新排序
 */
export const updateGroupProd = ( 
    id,sortNum
     ) => fetch('/admin/store-group/updateGroupProd',{id,sortNum},'GET') 


/**
 * 店铺导航
 */
export const shopNavData = (storeId) => fetch('/admin/store-decorate/getBar',{storeId},'GET')   
/**
 * 店铺导航图标列表
 */
export const shopIconList = (storeId,type) => fetch('/admin/store-decorate/listCron',{storeId,type},'GET')
/**
 * 更新店铺风格
 */
export const updtaeShopBar = (bars,storeId,deleteIds) => fetch('/admin/store-decorate/updateBar',{bars,storeId,deleteIds},'POST')
/**
 * 更新微页面
 */
export const updatePage = (
    ddecorateList,
    decorateList,id,storeId,title
    ) => fetch('/admin/store-decorate/updatePage',{  
    ddecorateList,
    decorateList,id,storeId,title},'POST')
/**
 * 添加微页面
 */
export const insertPage = (
    decorateList,storeId,title,id
    ) => fetch('/admin/store-decorate/insertPage',{ 
        decorateList,storeId,title,id},'POST')  
/**
 * 装修组件未关联商品列表
 */
export const setListProd = (current,
    decorateId,
    prodIds,
    prodName,
    prodType,
    size,
    storeId,
    ) => fetch('/admin/store-decorate/listProd',
    {current,decorateId,prodIds,prodName,prodType,size,storeId},'POST')
/**
 * 微页面详情
 */
 export const getMicroPage = (id) => fetch('/admin/store-decorate/getPage',{id},'GET')
/**
 * 微页面列表
 */
 export const microPageList = (current,size,storeId,title) => fetch('/admin/store-decorate/listPage',{current,size,storeId,title},'POST')
 /**
 * 设为主页
 */
export const setHomeIndex = (id,storeId) => fetch('/admin/store-decorate/setIndex',{id,storeId},'GET')
 /**
 * 创建副本
 */
export const microPageCopy = (id) => fetch('/admin/store-decorate/copy',{id},'GET')
 /**
 * 删除微页面列表
 */
export const deletemicroItem = (id) => fetch('/admin/store-decorate/deletePage',{id},'GET')




   

/**
 * OSS permission
 */
export const getOssPermission = (token) => fetch('/admin/oss/getPermission',{token},'POST')
/**
 * 获取视频上传认证数据
 */
export const getVideoAuthen = (fileName,fileSize,title) => fetch('/admin/vod-manager/createUploadVideoAuthen',{fileName,fileSize,title},'POST')
/**
 * 获取音频上传认证数据
 */
export const getAudioAuthen = (fileName,fileSize,title) => fetch('/admin/vod-manager/createUploadAudioAuthen',{fileName,fileSize,title},'POST')




/**
 * 账号密码登录
 */
export const accountLogin = (account,password,captcha) => fetch('/login', {account,password,captcha}, 'POST');
/**
 * 注册登录接口
 */
export const registerLogin = (account,captcha,checkPassword,password) => fetch('/register', {account,captcha,checkPassword,password}, 'POST');
/**
 * 获取注册手机号验证码
 */
export const registerPhone = (account) => fetch('/register-captcha', {account}, 'GET');
/**
 * 获取修改手机号验证码
 */
export const storeRegisterPhone = (account) => fetch('/admin/store/register-captcha', {account}, 'GET');
/**
 * 重置密码提交
 */
export const resetLogin = (account,captcha,checkPassword,password) => fetch('/reset-password', {account,captcha,checkPassword,password}, 'POST');
/**
 * 获取重置密码手机号验证码
 */
export const resetPhone = (account) => fetch('/reset-pwd-captcha', {account}, 'GET');

/**
 * 创建店铺
 */
export const addStore = (name,qrcode,url) => fetch('/admin/store/addStore', {name,qrcode,url}, 'POST');
/**
 * 我的知识店铺
 */
export const listStore = () => fetch('/admin/store/listStore', 'GET');
/**
 * 账号设置
 */
export const getMyInfo= () => fetch('/admin/store/getMyInfo', 'GET');
/**
 * 更新账号数据
 */
export const updateAccount= (headimg,phone,verifyCode) => fetch('/admin/store/updateAccount',{headimg,phone,verifyCode}, 'POST');









/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout'); 


/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');
