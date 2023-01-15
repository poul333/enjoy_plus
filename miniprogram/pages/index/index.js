// import utils from "../../utils/utils"

Page({
  onLoad() {
    this.getNotifyList()
  },

  /** 获取公告列表*/
  async getNotifyList() {
    const { code, data: notifyList } = await wx.http.get('/announcement')

    if (code !== 10000) return wx.utils.toast()

    this.setData({ notifyList })
  }
})
