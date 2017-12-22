import { InfiniteScroll } from '../../wxu/wxu'

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