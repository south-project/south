import fetch from '../config/fetch'

/**
 * 权限 permission
 */
export const getPermission = (account) => fetch('/login/selectPowerByAccount', {
  account
}, 'POST')

/**
 * 用户管理
 */
export const userManage = (param) => fetch('/user/selectManUerInfoPageHelper', param, 'POST')
/**
 * 用户管理
 */
export const exportUserManage = (param) => fetch('/user/ExportInfo', param, 'POST')

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
