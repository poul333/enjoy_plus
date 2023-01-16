Page({

  getUserNickName(ev) {
    // 更新用户昵称
    this.updateNickName(ev.detail.value)
  },

  async updateNickName(nickName) {
    const { code } = await wx.http.put('/userInfo', { nickName })
    if (code !== 10000) return wx.utils.toast()

    this.setData({ 'userInfo.nickName': nickName })
  },

  getUserAvatar(ev) {
    // this.setData({ 'userInfo.avatar': ev.detail.avatarUrl })
    // 更新用户头像
    this.updateUserAvatar(ev.detail.avatarUrl)
  },

  updateUserAvatar(avatarUrl) {
    // 调用接口上传图片
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: avatarUrl,
      name: 'file',
      header: {
        Authorization: getApp().token,
      },
      formData: {
        type: 'avatar',
      },
      success: (res) => {
        // 转换 json 数据
        const data = JSON.parse(res.data)
        // 检测接口调用结果
        if (data.code !== 10000) return wx.utils.toast('更新头像失败!')

        // 保存并预览图片地址
        this.setData({ 'userInfo.avatar': data.data.url })
      },
    })
  },
})