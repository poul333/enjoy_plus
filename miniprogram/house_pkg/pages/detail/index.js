Page({

  async onLoad({ id }) {
    if (!id) return
    const { code, data: houseDetail } = await wx.http.get(`/room/${id}`)
    if (code !== 10000) return wx.utils.toast()
    this.setData({ ...houseDetail })
  },

  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index',
    })
  },
})
