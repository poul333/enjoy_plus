Page({
  onLoad({ point, building }) {
    this.fake(point, building)
  },

  fake(point, building) {
    // 伪造房间号数据（仅用于授课）
    const size = Math.floor(Math.random() * 5) + 4
    const rooms = []

    // 随生生成若干个房间号
    for (let i = 0; i < size; i++) {
      // 随机楼层号
      const floor = Math.floor(Math.random() * 20) + 1
      // 随机房间号
      const No = Math.floor(Math.random() * 3) + 1
      // 组合楼层和房间号
      const room = [floor, 0, No].join('')
      // 不允许重复的房间号
      if (rooms.includes(room)) continue
      // 记录房间号
      rooms.push(room)
    }

    // 更新数据，重新渲染
    this.setData({ rooms, point, building })
  },

  goForm(ev) {
    const { point, building } = this.data
    wx.navigateTo({
      url: `/house_pkg/pages/form/index?point=${point}&building=${building}&room=${ev.mark.room}`
    })
  }
})