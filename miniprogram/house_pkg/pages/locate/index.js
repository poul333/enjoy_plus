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

  // 腾讯地图解析
  getPoint(latitude, longitude) {

    // 显示加载状态
    wx.showLoading({ title: '正在加载...', mask: true })
    // 逆地址解析（根据经纬度查询位置相关信息）
    qqMap.reverseGeocoder({
      location: [latitude, longitude].join(','),
      success: ({ result: { address } }) => {
        // 更新数据，重新渲染
        this.setData({ address })
      },
    })

    // 搜索周边
    qqMap.search({
      // 搜索关键字（查询周边的小区）
      keyword: '住宅小区',
      // 指定经纬度
      location: [latitude, longitude].join(','),
      // 查询数据条数
      page_size: 5,
      success: (res) => {
        // 处理得到的地点信息（过滤掉多余数据）
        const points = []
        res.data.forEach(({ id, title, _distance }) => {
          points.push({ id, title, _distance })
        })

        // 更新数据，重新渲染
        this.setData({ points })
      },
      fail() {
        wx.utils.toast('没有找附近的小区!')
      },
      complete: () => {
        // 隐藏加载状态
        wx.hideLoading()
      },
    })


  },

  goBuilding(ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/building/index?point=' + ev.mark.point,
    })
  },
})