<a name="toast"></a>

# Toast(options)
提示窗，支持文字与 icon 自由组合

参数 | 说明 | 类型 | 可选值 | 默认值 
--- | --- | --- | --- | ---
msg | 文本内容 | String
position | Toast 的位置 | String | top, bottom, middle | middle
duration | 持续时间（毫秒），若为 -1 <br />则不会自动关闭 | Number | | 1500
className | Toast 的自定义类名 | String
icon | 小程序原生 icon 组件 | String | success, success_no_circle, info, warn, <br />waiting, cancel, download, search, clear
colol | icon 的颜色 | String | | white
success | 关闭后的回调函数 | Function

> 执行 Toast 方法会返回一个 Toast 实例，每个实例都有 close 方法，用于手动关闭 Toast
```js
let instance = Toast({
  duration: 10000,
  msg: '不负代码不负卿',
  success: () => console.log('showToast完成')
})
setTimeout(() => {
  instance.close()
}, 3000)
```


**Example**  

```html
<import src="../../components/toast/toast.wxml"/>
<template is="toast" data="{{ ...wxu.toast }}"/>

<view class="page">
  <view class="page__hd">
    <view class="page__title">Toast</view>
    <view class="page__desc">弹出式提示，支持文字与 icon 自由组合。</view>
  </view>
  <view class="page__bd">
    <view class="weui-btn-area">
      <button class="weui-btn" type="default" bindtap="showToast">文字提示</button>
      <button class="weui-btn" type="default" bindtap="showIcon">icon 提示</button>
      <button class="weui-btn" type="default" bindtap="showToastIcon">文字与 icon 提示</button>
    </view>
  </view>
</view>
```

```js
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
```