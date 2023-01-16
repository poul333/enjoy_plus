Page({

  onShow() {
    this.getUserInfo()
  },

  async getUserInfo() {
    try {
      const { code, data: userInfo } = await wx.http.get('/userInfo')
      if (code !== 10000) return wx.utils.toast()
      this.setData({ userInfo })
    } catch (error) {
      console.log('数据获取失败');
    }
  }
})