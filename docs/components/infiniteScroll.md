<a name="infiniteScroll"></a>

# InfiniteScroll(options)
无限滚动指令

参数 | 说明 | 类型 | 可选值 | 默认值 
--- | --- | --- | --- | ---
name | 注册的事件函数名 | String |
msg | 触发时的文本内容 | String | | 加载中...
doneMsg | 完成后的文本内容 | String | | 已无更多
spinnerType | icon | String | fading-circle, snake | fading-circle
className | 文本内容的自定义类名 | String


## 注册的事件函数中的api
完成此次加载：done()

InfiniteScroll 结束：done(true)


## 说明
注意小程序上拉触底事件的处理函数 onReachBottom 执行条件需元素内容到达底部。
注册的事件函数需传入 done 方法。
若希望 InfiniteScroll 组件在内容不足时总显示在窗口底部，请参考例子中的 Sticky footers 布局。


**Example**  

```html
<view class="page">
  <view class="main">
    <view class="sticky">
      <view class="page__hd">
        <view class="page__title">InfiniteScroll</view>
        <view class="page__desc">无限滚动指令。</view>
      </view>
      <view>
        <view wx:for="{{ list }}" wx:key="id" class="infinite-scroll-item">{{ item }}</view>
      </view>
    </view>
  </view>
  <view class="footer">
    <import src="../../components/infiniteScroll/infiniteScroll.wxml"/>
    <template is="infiniteScroll" data="{{ ...wxu.infiniteScroll }}"/>
  </view>
</view>
```

```js
import { InfiniteScroll } from '../../components/wxu'

Page({
  data: {
    list: []
  },
  onLoad() {
    InfiniteScroll({
      name: 'getData',
      msg: '玩命加载中...',
      doneMsg: '我是有底线的',
      spinnerType: 'snake'
    })
    this.loadMore()
  },
  getData(done) {
    let list = this.data.list
    let last = list[list.length - 1] || 0
    setTimeout(() => {
      for (let i = 1; i <= 10; i++) {
        list.push(last + i)
      }
      this.setData({
        list: list
      })
      if (list[list.length - 1] < 20) {
        done()
      } else {
        done(true)
      }
    }, 1000)
  },
  onReachBottom() {
    this.loadMore()
  }
})
```