// app.js

// 执行 utils/uitls.js
import './utils/utils'

import './utils/http'

App({
  globalData: {},

  onLaunch() {
    this.getToken('token')
    this.getToken('refresh_token')
  },

  /** 获取token*/
  getToken(key) {
    wx.getStorage({
      key,
      success: (res) => {
        this[key] = res.data
      }
    })
  },

  /** 全局存储token*/
  setToken(token, refresh_token) {
    // 拼凑完整 token 
    token = 'Bearer ' + token
    refresh_token = 'Bearer ' + refresh_token
    wx.setStorageSync('token', token)
    wx.setStorageSync('refresh_token', refresh_token)
    this.token = token
    this.refresh_token = refresh_token
  }
})
