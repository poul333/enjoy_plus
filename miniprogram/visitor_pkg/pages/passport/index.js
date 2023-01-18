Page({

  onLoad({ id }) {
    // 获取通行证
    this.getPassport(id)
  },
  async getPassport(id) {
    if (!id) return
    // 请求数据接口
    const { code, data: passport } = await wx.http.get('/visitor/' + id)
    // 检测接口调用的结果
    if (code !== 10000) return wx.utils.toast('获取通行证失败!')
    // 渲染通行证
    this.setData({ ...passport })
  },

  onShareAppMessage() {
    return {
      title: '查看通行证',
      path: '/visitor_pkg/pages/passport/index',
      imageUrl: 'https://enjoy-plus.oss-cn-beijing.aliyuncs.com/images/share_poster.png',
    }
  },

  // 保存图片
  async saveImage() {
    // 获取图片的临时路径
    const { path } = await wx.getImageInfo({ src: this.data.url })
    // 将图片保存到本地
    await wx.saveImageToPhotosAlbum({ filePath: path })
  }
})
