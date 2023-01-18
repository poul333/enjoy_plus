// map.js

let repair_id = ''

Page({
  data: {
    dialogVisible: false,
    latitude: 40.060539,
    longitude: 116.343847,
  },

  onLoad({ id }) {
    this.getRepairDetail((repair_id = id))
  },

  // 修改报修
  editRepair() {
    wx.navigateTo({
      url: `/repair_pkg/pages/form/index?id=${repair_id}`
    })
  },

  async getRepairDetail(id) {
    const { code, data: repairDetail } = await wx.http.get(`/repair/${id}`)
    if (code !== 10000) return wx.utils.toast()
    this.setData({ ...repairDetail })
  },

  openDialogLayer() {
    this.setData({ dialogVisible: true })
  },

  async cancelRepair() {
    // 请求数据接口
    const { code } = await wx.http.put('/cancel/repaire/' + repair_id)
    // 检测接口的调用结果
    if (code !== 10000) return wx.utils.toast('取消报修失败!')
    // 跳转到报修列表页面
    wx.navigateBack()
  },


  dialogClose(ev) {
    ev.detail === 'confirm' && this.cancelRepair()
  }
})
