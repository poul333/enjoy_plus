// app.js

// 执行 utils/uitls.js
import './utils/utils'

import './utils/http'

App({
  globalData: {},

  onLaunch() {
    this.getToken()
  },

  /** 获取token*/
  getToken() {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        this.token = res.data
      }
    })
  },

  /** 全局存储token*/
  setToken(token) {
    // 拼凑完整 token 
    token = 'Bearer ' + token
    wx.setStorageSync('token', token)
    this.token = token
  }
})
