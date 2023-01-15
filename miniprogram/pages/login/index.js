
let secert_code = ''

Page({
  data: {
    countDownVisible: false,
  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },

  // 验证手机号格式
  verifyMobile() {
    // 宽松的验证规则
    const reg = /^[1][3-8][0-9]{9}$/
    // 正则验证（去除两端空格）
    const valid = reg.test(this.data.mobile.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写正确的手机号码!')
    // 返回验证结果
    return valid
  },

  copyCode() {
    wx.setClipboardData({ data: secert_code })
  },

  // 验证码
  async getCode() {
    if (!this.verifyMobile()) return
    const { code, data } = await wx.http.get('/code', { mobile: this.data.mobile.trim() })
    if (code !== 10000) return wx.utils.toast()
    wx.utils.toast('短信发送成功')
    this.setData({ countDownVisible: true })
    secert_code = data.code
  }
})
