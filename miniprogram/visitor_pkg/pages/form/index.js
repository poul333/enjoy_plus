var dayjs = require('dayjs')

Page({
  data: {
    dateLayerVisible: false,
    houseLayerVisible: false,
    houseId: '',
    gender: 1,
    name: '',
    mobile: '',
    houseList: [],
    // 指定 `van-datetime-picker` 组件的起始日期
    currentDate: Date.now(),
    maxDate: Date.now() + 24 * 3600 * 1000 * 3,
  },

  onLoad() {
    this.getHouseList()
  },

  selectHouse(ev) {
    const { id: houseId, name: houseInfo } = ev.detail
    this.setData({ houseId, houseInfo })
  },

  // 获取访客来访的时间
  selectDate(ev) {
    this.setData({
      // 隐藏时间弹层
      dateLayerVisible: false,
      visitDate: dayjs(ev.detail).format('YYYY/MM/DD')
    })
  },

  async getHouseList() {
    const { code, data: houseList } = await wx.http.get('/house')
    if (code !== 10000) return wx.utils.toast()
    this.setData({ houseList })
  },

  // 表单验证
  verifyHouse() {
    const valid = this.data.houseId !== ''
    // 验证结果提示
    if (!valid) wx.utils.toast('请选择房屋信息!')
    // 返回验证结果
    return valid
  },
  // 验证业主姓名（必须为汉字）
  verifyName() {
    // 正则表达式
    const reg = /^[\u4e00-\u9fa5]{2,5}$/
    // 验证业主姓名
    const valid = reg.test(this.data.name.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写真实中文姓名!')
    // 返回验证结果
    return valid
  },

  verifyMobile() {
    // 验证手机号
    const reg = /^[1][3-8][0-9]{9}$/
    const valid = reg.test(this.data.mobile)
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写正确的手机号码!')
    // 返回验证结果
    return valid
  },

  async submitForm() {
    // 逐个验证表单的数据
    if (!this.verifyHouse()) return
    if (!this.verifyName()) return
    if (!this.verifyMobile()) return
    // 待提交的数据
    const { houseId, name, gender, mobile, visitDate } = this.data
    // 请求接口
    const { code, data } = await wx.http.post('/visitor', { houseId, name, gender, mobile, visitDate })
    // 检测接口调用结果
    if (code !== 10000) return wx.utils.toast('添加访客失败!')
    // 查看通行证
    wx.navigateTo({
      url: '/visitor_pkg/pages/passport/index?id=' + data.id,
    })
  },

  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goPassport() {
    wx.reLaunch({
      url: '/visitor_pkg/pages/passport/index',
    })
  },
})
