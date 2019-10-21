/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let url_str = '';
let routerMode = 'hash';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
  url_str = '/img/';
  //url_str = 'http://192.168.1.153:8089';
  //url_str = 'http://192.168.1.160:8089';
  url_str = 'http://www.nftjzk.com:8898';
  //url_str = 'http://118.31.121.220:8898';

} else if (process.env.NODE_ENV == 'production') {
  url_str = 'http://www.nftjzk.com:8898';
}
export {
  url_str,
  routerMode,
  imgBaseUrl,
}
