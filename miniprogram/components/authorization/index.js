// components/authorization/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: false
  },


  lifetimes: {
    attached() {
      const isLogin = !!getApp().token

      this.setData({ isLogin })

      // 如果未登录，跳到登录页
      if (!isLogin) {

        // 回调地址
        const pageStack = getCurrentPages()
        const lastPage = pageStack[pageStack.length - 1]
        const redirectUrl = lastPage.route

        // 如果是未登录状态，将onLoad 和 onShow 的执行逻辑置成空函数
        lastPage.onLoad = () => { }
        lastPage.onShow = () => { }

        wx.redirectTo({
          url: `/pages/login/index?redirectURL=/${redirectUrl}`
        })
      }
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {

  }
})
