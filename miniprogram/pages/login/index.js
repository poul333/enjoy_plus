
let secert_code = ''

const app = getApp()

Page({
  data: {
    countDownVisible: false,
    mobile: "",
    code: ''
  },

  onLoad({ redirectURL }) {
    this.setData({ redirectURL })
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

  // 验证验证码
  verifyCode() {
    // 验证码为6位数字
    const reg = /^\d{6}$/
    // 验证验证码
    const valid = reg.test(this.data.code.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请检查验证码是否正确!')
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
  },

  // 提交数据完成登录
  async submitForm() {
    // 逐个验证表单数据
    if (!this.verifyMobile()) return
    if (!this.verifyCode()) return

    const { code, mobile } = this.data
    const res = await wx.http.post('/login', { mobile, code })
    if (res.code !== 10000) return wx.utils.toast('请检查验证码是否正确!')

    // 存储token
    app.setToken(res.data.token, res.data.refreshToken)

    // 登录后跳转到用户想要去的页面
    wx.redirectTo({
      url: this.data.redirectURL
    })
  },
})
