Page({

  onShow() {
    this.getRepairList()
  },

  async getRepairList() {
    const { code, data: { rows: repairList } } = await wx.http.get('/repair', { current: 1, pageSize: 10 })
    if (code !== 10000) return wx.utils.toast()
    this.setData({ repairList })
  },

  goDetail(ev) {
    wx.navigateTo({
      url: `/repair_pkg/pages/detail/index?id=${ev.mark.id}`,
    })
  },
  addRepair() {
    wx.navigateTo({
      url: '/repair_pkg/pages/form/index',
    })
  },
})
