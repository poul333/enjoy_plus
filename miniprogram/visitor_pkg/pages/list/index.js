Page({
  goPassport(ev) {
    const { id, status } = ev.mark
    if (status === 0) return wx.utils.toast('当前通行证已失效')
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index?id=' + id,
    })
  },

  onLoad() {
    this.getVistorList()
  },

  async getVistorList() {
    const { code, data: { rows: visitorList } } = await wx.http.get('/visitor')
    if (code !== 10000) return wx.utils.toast()
    this.setData({ visitorList })
  }
})
