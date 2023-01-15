// import utils from "../../utils/utils"

Page({
  async onLoad() {
    // utils.toast('页面加载完成')
    // wx.utils.toast('页面加载完成')

    const { code, data } = await wx.http.get('/announcement')

    if (code !== 10000) return wx.utils.toast()

    this.setData({})
  }
})
