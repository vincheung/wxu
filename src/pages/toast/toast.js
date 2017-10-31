import { Toast } from '../../components/wxu'

Page({
  showToast() {
    Toast({
      duration: 3000,
      msg: '不负代码不负卿',
      success: () => console.log('showToast完成')
    })
  },
  showIcon() {
    Toast({
      duration: 3000,
      icon: 'search',
      success: () => console.log('showIcon完成')
    })
  },
  showToastIcon() {
    Toast({
      duration: 3000,
      msg: '操作成功',
      icon: 'success_no_circle',
      success: () => console.log('showToastIcon完成')
    })
  }
})