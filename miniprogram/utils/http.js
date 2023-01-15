// 请求封装

// 导入 http 模块
import http from 'wechat-http'
/**
 * 配置接口基础路径
 */
http.baseURL = 'https://live-api.itheima.net'
/**
 * 挂载方法到全局
 */

// 响应拦截器
http.intercept.response = (res) => {
  return res.data
}

wx.http = http
/**
 * 模块导出
 */
export default http
