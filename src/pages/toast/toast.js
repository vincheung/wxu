import { Toast } from '../../wxu/wxu'

Page({
  showToast() {
    Toast({
      msg: '不负代码不负卿',
      success: () => console.log('showToast完成')
    })
  },
  showIcon() {
    Toast({
      icon: 'search',
      success: () => console.log('showIcon完成')
    })
  },
  showToastIcon() {
    Toast({
      msg: '操作成功',
      icon: 'success_no_circle',
      success: () => console.log('showToastIcon完成')
    })
  }
})