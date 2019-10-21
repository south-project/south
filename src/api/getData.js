import fetch from '../config/fetch'

/**
 * 权限 permission
 */
export const getPermission = (account) => fetch('/login/selectPowerByAccount', {
  account
}, 'POST')
/**
 * 三级联动数据
 */
export const queryArea = (code) => fetch('/area/queryArea', {
  code
}, 'POST')

/**
 * 批量设置为有效估算
 */
export const updateBatchEffectiveEstimate = (list) => fetch('/effect/updateBatchEffectiveEstimate', list, 'POST')
/**
 * 将某条记录是否设置有效估算
 */
export const updateOneEffectiveEstimate = (projectNumber, effectiveEstimate) => fetch('/effect/updateOneEffectiveEstimate', {
  projectNumber,
  effectiveEstimate
}, 'POST')

/**
 * 估算详情
 */
export const estimateClear = (param) => fetch('/investment/queryOneInvestDetail', param, 'POST')

/**
 * 估算记录
 */
export const estimateManage = (param) => fetch('/investment/selectAllInfo', param, 'POST')
/**
 * 估算记录 批量设置为有效估算
 */
export const setEstimateEffect = (list) => fetch('/investment/setBatchEffect', {
  list
}, 'POST')
/**
 * 估算记录 批量设置为无效估算
 */
export const setEstimateUnEffect = (list) => fetch('/investment/setBatchNoEffect', {
  list
}, 'POST')
/**
 * 估算记录 将某条记录设置有效调整设置
 */
export const setEstimateOneEffect = (id, effectiveEstimate) => fetch('/investment/setOneEffect', {
  id,
  effectiveEstimate
}, 'POST')
/**
 * 估算记录 导出数据
 */
export const exportEstimateManage = (param) => fetch('/investment/exportInvestment', param, 'POST')


/**
 * 用户管理
 */
export const userManage = (param) => fetch('/user/selectManUserInfoPageHelper', param, 'POST')
/**
 * 用户管理 导出数据
 */
export const exportUserManage = (param) => fetch('/user/expExcelData', param, 'POST')
/**
 * 用户管理 用户详情
 */
export const userManageList = (id) => fetch('/user/selectOneUserInfo', {
  id
}, 'POST')
/**
 * 用户管理 估算记录
 */
export const userManageRecords = (id) => fetch('/user/selectInValueOfPartInfo', {
  id
}, 'POST')
/**
 * 设为有效估算
 */
export const setEffective = (id, effective_estimate) => fetch('/user/updateOneEffectiveEstimate', {
  id,
  effective_estimate
}, 'POST')

/**
 * 均价数据库
 */
export const buildAllType = () => fetch('/avg/selectAllAvgType', {}, 'POST')
/**
 * 均价数据库 建筑分类(多的子数据)
 */
export const buildDetailType = () => fetch('/avg/selectAllBuildType', {}, 'POST')
/**
 * 均价数据库 建安成本分类展示
 */
export const queryAllBuildTypePrice = (param) => fetch('/avg/queryAllBuildTypePrice', param, 'POST')
/**
 * 均价数据库 建筑分类 建安某条修改预设单价
 */
export const updateReservePrice = (param) => fetch('/avg/updateReservePrice', param, 'POST')
/**
 * 均价数据库 建筑分类  批量修改预设单价
 */
export const batchUpdateReservePrice = (param) => fetch('/avg/batchUpdateReservePrice', param, 'POST')
/**
 * 均价数据库 建筑分类  建安成本分类导出数据
 */
export const buildExpExcelData = (param) => fetch('/avg/buildExpExcelData', param, 'POST')
/**
 * 均价数据库 DataManage建安成本之外展示
 */
export const queryOtherBuildTypePrice = (param) => fetch('/avg/queryOtherAllBuildTypePrice', param, 'POST')
/**
 * 均价数据库 DataManage修改预设单价
 */
export const updateOtherReservePrice = (param) => fetch('/avg/updateOtherReservePrice', param, 'POST')
/**
 * 均价数据库 DataManage批量修改预设单价
 */
export const batchOtherUpdateReservePrice = (param) => fetch('/avg/batchOtherUpdateReservePrice', param, 'POST')
/**
 * 均价数据库 DataManage导出数据
 */
export const buildValueExpExcelData = (param) => fetch('/avg/buildValueExpExcelData', param, 'POST')
/**
 * 均价数据库 通用接口采用预设单价
 */
export const setAvgAllPrice = (param) => fetch('/avg/setAvgPrice', param, 'POST')


/**
 * 建筑货值 列表页
 */
export const queryAllValueType = (param) => fetch('/value/queryAllValueType', param, 'POST')
/**
 * 建筑货值 导出数据
 */
export const theValueExpExcelData = (param) => fetch('/value/theValueExpExcelData', param, 'POST')


/**
 * 车位货值 列表页
 */
export const queryAllCarValueType = (param) => fetch('/car/queryAllCarValueType', param, 'POST')
/**
 * 车位货值 导出数据
 */
export const carExpExcelData = (param) => fetch('/car/expExcelData', param, 'POST')



/**
 * banner管理 列表页
 */
export const bannerManageList = () => fetch('/get/images', {}, 'POST')
/**
 * banner管理 删除
 */
export const deleteBanner = (id) => fetch('/delete/image', {
  id
}, 'GET')
/**
 * banner管理 编辑展示
 */
export const editShowBanner = (id) => fetch('/select/OneImage', {
  id
}, 'GET')
/**
 * banner管理 编辑提交
 */
export const editBanner = (param) => fetch('/update/image', param, 'POST')
/**
 * banner管理 排序数据
 */
export const bannerNum = () => fetch('/getNoNum/image', {}, 'POST')
/**
 * banner管理 添加banner
 */
export const addBanner = (param) => fetch('/add/image', param, 'POST')


/**
 * 系统设置 基本设置
 */
export const insertBaseInfo = (param) => fetch('/set/basic/insertInfo', param, 'POST')
/**
 * 系统设置 基本设置(展示)
 */
export const showBaseInfo = () => fetch('/set/basic/selectBasicInfo', {}, 'POST')


/**
 * 系统设置 所有角色
 */
export const selectRoleCount = () => fetch('/set/role/selectRoleCount', {}, 'POST')
/**
 * 系统设置 角色所有权限
 */
export const allRoleCount = (name) => fetch('/role/selectAllPower', {
  name
}, 'POST')
/**
 * 系统设置 编辑展示角色权限
 */
export const editRoleCount = (id) => fetch('/set/role/selectOneRoleOfPowerByRoleId', {
  id
}, 'POST')
/**
 * 系统设置 编辑提交
 */
export const updateRole = (param) => fetch('/role/updateRole', param, 'POST')
/**
 * 系统设置 添加角色
 */
export const insertRole = (param) => fetch('/role/insertRoleAndPower', param, 'POST')
/**
 * 系统设置 删除角色
 */
export const deleteRole = (id) => fetch('/set/role/deleteRole', {
  id
}, 'POST')



/**
 * 系统设置 管理员列表
 */
export const adminManageList = (pageNum, pageSize) => fetch('/set/mam/selectSysUserInfoPageHelper', {
  pageNum,
  pageSize
}, 'GET')
/**
 * 系统设置 管理员详情
 */
export const adminCheck = (id) => fetch('/set/mam/selectOneSysUserInfo', {
  id
}, 'POST')
/**
 * 系统设置 编辑管理员
 */
export const editAdminManage = (param) => fetch('/set/mam/updateOneSysUserInfo', param, 'POST')
/**
 * 系统设置 添加管理员
 */
export const addAdminManage = (param) => fetch('/set/mam/insertOneSysUserInfo', param, 'POST')
/**
 * 系统设置 删除管理员
 */
export const deleteAdminManage = (id) => fetch('/set/mam/deleteOneSysUserInfo', {
  id
}, 'POST')
/**
 * 系统设置 管理员 角色下拉框
 */
export const selectAdmin = () => fetch('/set/mam/selectAllRoleInfo', {}, 'POST')







/**
 * 账号密码登录
 */
export const accountLogin = (account, password) => fetch('/login', {
  account,
  password,
}, 'POST');
/**
 * 修改密码
 */
export const updatePassword = (param) => fetch('/sysUser/updatePassword', param, 'POST');
