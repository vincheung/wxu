import { Popup } from '../../components/wxu'

Page({
  Popup() {
    Popup({
      msg: '不负代码不负卿',
      success: () => console.log('PopupTop完成')
    })
  },
  PopupButton() {
    Popup({
      type: 'button',
      msg: '关闭',
      buttonType: 'primary',
      success: () => console.log('PopupButton完成')
    })
  }
})