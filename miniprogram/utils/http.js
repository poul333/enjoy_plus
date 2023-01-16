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
http.intercept.response = async ({ statusCode, data, config }) => {
  // refresh_token 刷新token
  if (statusCode === 401) {
    // 判断是否refresh_token 失效 跳转到登录
    if (config.url.includes('/refreshToken')) {

      const pageStack = getCurrentPages()
      // 取出当前页面路径，登录成功能跳转到该页面
      const lastPage = pageStack[pageStack.length - 1]
      // 取出当前页面路径，登录成功能跳转到该页面
      const redirectURL = lastPage.route

      return wx.redirectTo({
        url: `/pages/login/index?redirectURL=/${redirectURL}`
      })
    }

    const app = getApp()

    // 如果本地没有refresh——token 就不必去刷新token
    if (!app.refresh_token) return

    const res = await http({
      url: "/refreshToken",
      method: 'POST',
      header: {
        Authorization: app.refresh_token
      }
    })

    // 更新 token 和 refresh_token
    app.setToken(res.data.token, res.data.refreshToken)
    // 重新发起请求
    return http(
      Object.assign(config, {
        // 传递新的token
        header: {
          Authorization: app.token
        }
      })
    )
  }

  return data
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
