import fetch from '../config/fetch'

/**
 * 权限 permission
 */
export const getPermission = (account) => fetch('/login/selectPowerByAccount', {
  account
}, 'POST')

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
 * 均价数据库 建筑分类
 */
export const buildAllType = () => fetch('/avg/selectAllType', {}, 'POST')
/**

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
