Page({
  onLoad({ id }) {
    this.getNotifyDetail(id)
  },

  async getNotifyDetail(id) {
    if (!id) return
    const { code, data: notifyDetail } = await wx.http.get('/announcement/' + id)
    if (code !== 10000) return wx.utils.toast()
    this.setData({ notifyDetail })
  }
})