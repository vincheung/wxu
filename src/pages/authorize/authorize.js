// 请注意无 AppID 关联下，此页面功能是受限的
import { Authorize } from '../../components/wxu'

Page({
  onLoad() {
    // Authorize()
  },
  onShow() {
    Authorize({
      scope: ['scope.userInfo', 'scope.userLocation'],
      success: () => {
        this.init()
      }
    })
  },
  init() {
    this.setData({
      success: '授权完成，执行 init 函数。'
    })
  }
})