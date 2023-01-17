Page({
  data: {
    gender: 1,
    name: '',
    mobile: '',
    idcardFrontUrl: '',
    idcardBackUrl: '',
  },

  onLoad({ point, building, room }) {
    this.setData({ point, building, room })
  },

  // 验证业主姓名
  verifyName() {
    // 验证业主姓名（必须为汉字）
    const reg = /^[\u4e00-\u9fa5]{2,5}$/
    // 验证业主姓名
    const valid = reg.test(this.data.name.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写真实中文姓名!')
    // 返回验证结果
    return valid
  },

  // 验证手机号
  verifyMobile() {
    const reg = /^[1][3-8][0-9]{9}$/
    const valid = reg.test(this.data.mobile.trim())
    if (!valid) wx.utils.toast('请填写正确手机号')
    return valid
  },

  // 验证身份证
  verifyPicture() {
    const valid = !!this.data.idcardFrontUrl && !!this.data.idcardBackUrl
    if (!valid) wx.utils.toast('请上传身份证图片')
    return valid
  },

  async uploadPicture(ev) {
    const type = ev.mark.type
    console.log(type);
    const media = await wx.chooseMedia({
      count: 1, // 只能选择1张图片
      mediaType: ['image'], // 只能选择图片类型
      sizeType: ['compressed'], // 默认为压缩模式
    })

    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: media.tempFiles[0].tempFilePath,
      name: 'file',
      header: {
        Authorization: getApp().token,
      },
      success: (res) => {
        const data = JSON.parse(res.data)
        // 如果一个对象的属性是一个变量，则使用 [] 包起来
        this.setData({ [type]: data.data.url })
      }
    })
  },

  async submitForm() {
    if (!this.verifyName()) return
    if (!this.verifyMobile()) return
    if (!this.verifyPicture()) return

    delete this.data.__webviewId__  // 删除多余对象属性
    const { code } = await wx.http.post('/room', this.data)
    if (code !== 10000) return wx.utils.toast()

    // 跳回房屋列表
    wx.navigateBack({
      delta: 4
    })

  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark.type
    this.setData({ [type]: '' })
  },


})
