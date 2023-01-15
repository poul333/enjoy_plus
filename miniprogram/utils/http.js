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

// 请求拦截器
http.intercept.request = (config) => {
  const { token } = getApp()

  // 指定一个公共的头信息
  // 初始为空对象后续可以扩展
  const defaultHeader = {}
  if (token) defaultHeader.Authorization = token
  // 合并自定义头信息和公共头信息
  config.header = Object.assign({}, defaultHeader, config.header)
  return config
}

wx.http = http
/**
 * 模块导出
 */
export default http
