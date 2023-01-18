let house_id = ''
let house_index = 0

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
    this.setData({ houseList, isEmpty: houseList.length === 0 })
  },

  // 删除
  async deleteHouse() {
    const { code } = await wx.http.delete(`/room/${house_id}`)
    if (code !== 10000) return wx.utils.toast('删除房屋失败')
    // 更新列表
    this.data.houseList.splice(house_index, 1)
    this.setData({ houseList: this.data.houseList })
  },

  // dialog回调
  dialogClose(ev) {
    ev.detail === 'confirm' && this.deleteHouse()
  },

  swipeClose(ev) {
    const { position, instance } = ev.detail
    console.log(ev.mark);

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })

      house_id = ev.mark.id
      house_index = ev.mark.index

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
