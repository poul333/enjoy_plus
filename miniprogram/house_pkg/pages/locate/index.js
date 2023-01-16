import qqMap from '../../../utils/qqmap'

Page({
  onLoad() {
    this.getLocation()
  },

  async getLocation() {
    const { latitude, longitude } = await wx.getLocation()
    this.getPoint(latitude, longitude)
  },

  async chooseLocation() {
    const { latitude, longitude } = await wx.chooseLocation()
    this.getPoint(latitude, longitude);
  },

  getPoint(latitude, longitude) {

    wx.showLoading({ title: '正在加载', mask: true })

    //  逆地址解析
    qqMap.reverseGeocoder({
      location: [latitude, longitude].join(','),
      success: ({ result: { address } }) => {
        this.setData({ address })
      }
    }),

      // 地点搜索
      qqMap.search({
        // 搜索关键字（查询周边的小区）
        keyword: '住宅小区',
        // 指定经纬度
        location: [latitude, longitude].join(','),
        // 查询数据条数
        page_size: 5,
        success: (res) => {
          const points = []
          res.data.forEach(({ id, title, _distance }) => {
            points.push({ id, title, _distance })
          })

          this.setData({ points })
        },
        complete: () => {
          wx.hideLoading()
        }
      })


  }
})