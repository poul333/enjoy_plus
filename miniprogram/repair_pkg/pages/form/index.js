// import dayjs from "dayjs"
var dayjs = require('dayjs')

Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [],
    repairItem: [],
    attachment: [],
  },

  onLoad() {
    this.getHouseList()
    this.getRepairItem()
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
    const { name: houseInfo } = ev.detail
    this.setData({ houseInfo })
  },

  // 选择维修项目
  selectRepairItem(ev) {
    const { name: repairItemName } = ev.detail
    this.setData({ repairItemName })
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
