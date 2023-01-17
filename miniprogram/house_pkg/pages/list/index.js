Page({
  data: {
    dialogVisible: false,
  },

  onShow() {
    this.getHouseList()
  },

  // 获取房屋列表
  async getHouseList() {
    const { code, data: houseList } = await wx.http.get('/room')
    if (code !== 10000) return wx.utils.toast()
    this.setData({ houseList })
  },

  swipeClose(ev) {
    const { position, instance } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },

  goDetail(ev) {
    wx.navigateTo({
      url: `/house_pkg/pages/detail/index?id=${ev.mark.id}`
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },
})
