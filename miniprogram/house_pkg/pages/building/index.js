Page({
  onLoad({ point }) {
    this.fake(point)
  },

  fake(point) {
    // 伪造楼栋/号数据（仅用于授课）
    const size = Math.floor(Math.random() * 4) + 3
    const type = size > 4 ? '号楼' : '栋'
    // 更新数据，重新渲染
    this.setData({ point, size, type })
  },

  goRoom(ev) {
    wx.navigateTo({
      url: `/house_pkg/pages/room/index?point=${this.data.point}&building=${ev.mark.building}`
    })

  }
})