<a name="popup"></a>

# Popup(options)
弹出框，可自定义内容

参数 | 说明 | 类型 | 可选值 | 默认值 
--- | --- | --- | --- | ---
type | Popup 的类型 | String | default, button | default
msg | 文本内容 | String
className | Popup 的自定义类名，若有将覆盖默认样式 | String
duration(default) | 持续时间（毫秒），若为 -1 <br />则不会自动关闭 | Number | | 1500
buttonType(button) | 按钮的样式类型 | String | primary, default, warn
plain(button) | 按钮是否镂空，背景色透明 | Boolean | | false
success | 关闭后的回调函数 | Function

> 执行 Popup 方法会返回一个 Popup 实例，每个实例都有 close 方法，用于手动关闭 Popup
```js
let instance = Popup({
  duration: 10000,
  msg: '不负代码不负卿',
  success: () => console.log('PopupTop完成')
})
setTimeout(() => {
  instance.close()
}, 3000)
```


**Example**  

```html
<import src="../../wxu/popup/popup.wxml"/>
<template is="popup" data="{{ ...wxu.popup }}"/>

<view class="page">
  <view class="page__hd">
    <view class="page__title">Popup</view>
    <view class="page__desc">弹出框，可自定义内容。</view>
  </view>
  <view class="page__bd">
    <view class="weui-btn-area">
      <button class="weui-btn" type="default" bindtap="Popup">Popup</button>
      <button class="weui-btn" type="default" bindtap="PopupButton">PopupButton</button>
    </view>
  </view>
</view>
```

```js
import { Popup } from '../../wxu/wxu'

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
```