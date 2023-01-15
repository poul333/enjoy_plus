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
  }
})
