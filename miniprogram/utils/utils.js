// 公共方法

const utils = {
  toast(title = '数据加载失败') {
    wx.showToast({
      title,
      mask: true,
      icon: 'none'
    })
  }
}

// 将封装的 utils 对象，挂载到 wx 对象上
// 全局使用
wx.utils = utils

// 也可做模块导出，使用时导入
export default utils