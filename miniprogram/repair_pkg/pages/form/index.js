// import dayjs from "dayjs"
var dayjs = require('dayjs')

Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseId: '',
    repairItemId: '',
    houseList: [],
    repairItem: [],
    attachment: [],
    mobile: "",
    description: "",
  },

  onLoad({ id }) {
    this.getHouseList()
    this.getRepairItem()

    // 更新标题
    if (id) {
      wx.setNavigationBarTitle({ title: '修改报修信息' })
      this.getRepairDetail(id)
    }
  },



  // 验证表单
  verifyHouse() {
    const valid = this.data.houseId !== ''
    // 验证结果提示
    if (!valid) wx.utils.toast('请选择房屋信息!')
    // 返回验证结果
    return valid
  },
  verifyRepair() {
    const valid = this.data.repairItemId !== ''
    // 验证结果提示
    if (!valid) wx.utils.toast('请选择维修项目!')
    // 返回验证结果
    return valid
  },
  verifyMobile() {
    // 验证手机号
    const reg = /^[1][3-8][0-9]{9}$/
    const valid = reg.test(this.data.mobile.trim())
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写正确的手机号码!')
    // 返回验证结果
    return valid
  },
  verifyDate() {
    // 验证日期格式
    const reg = /^\d{4}\/\d{2}\/\d{2}$/
    const valid = reg.test(this.data.appointment)
    // 验证结果提示
    if (!valid) wx.utils.toast('请选择预约日期!')
    // 返回验证结果
    return valid
  },
  verifyDescription() {
    // 验证报修项目描述
    const valid = this.data.description.trim() !== ''
    // 验证结果提示
    if (!valid) wx.utils.toast('请填写问题描述!')
    // 返回验证结果
    return valid
  },

  async getRepairDetail(id) {
    if (!id) return
    const { code, data: repairDetail } = await wx.http.get(`/repair/${id}`)
    if (code !== 10000) return wx.utils.toast()
    this.setData({ ...repairDetail })
  },

  async submitForm() {
    // 逐个验证表单数据
    if (!this.verifyHouse()) return
    if (!this.verifyRepair()) return
    if (!this.verifyMobile()) return
    if (!this.verifyDate()) return
    if (!this.verifyDescription()) return
    // 解构获取接口需要的参数
    const { id, houseId, repairItemId, appointment, mobile, description, attachment } = this.data
    // 请求数据接口
    const { code } = await wx.http.post('/repair', {
      id,
      houseId,
      repairItemId,
      appointment,
      mobile,
      description,
      attachment
    })

    if (code !== 10000) return wx.utils.toast()
    // 跳转到表单列表页面
    wx.redirectTo({
      url: '/repair_pkg/pages/list/index',
    })
  },

  // 获取房屋列表
  async getHouseList() {
    const { code, data: houseList } = await wx.http.get('/house')
    if (code !== 10000) return wx.utils.toast()
    this.setData({ houseList })
  },

  // 获取维修列表
  async getRepairItem() {
    const { code, data: repairItem } = await wx.http.get('/repairItem')
    if (code !== 10000) return wx.utils.toast()
    this.setData({ repairItem })
  },

  // 选择维修房屋
  selectHouse(ev) {
    const { id: houseId, name: houseInfo } = ev.detail
    this.setData({ houseInfo, houseId })
  },

  // 选择维修项目
  selectRepairItem(ev) {
    const { id: repairItemId, name: repairItemName } = ev.detail
    this.setData({ repairItemName, repairItemId })
  },

  // 选择维修时间
  selectDate(ev) {
    this.setData({
      dateLayerVisible: false,
      appointment: dayjs(ev.detail).format('YYYY/MM/DD')
    })
  },

  // 上传图片
  afterRead(ev) {
    const { file } = ev.detail
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: file.url,
      name: 'file',
      header: {
        Authorization: getApp().token,
      },
      success: (res) => {
        const data = JSON.parse(res.data)
        // 上传完成需要更新
        const { attachment } = this.data
        attachment.push({ ...data.data })
        // 渲染数据
        this.setData({ attachment })
      }
    })
  },

  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false,
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index',
    })
  },
})
