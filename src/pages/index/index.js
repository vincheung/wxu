Page({
  data: {
    list: [
      {
        name: 'Toast',
        open: true,
        url: '/pages/toast/toast'
      },
      {
        name: 'Popup',
        open: true,
        url: '/pages/popup/popup'
      },
      {
        name: 'Infinite Scroll',
        open: true,
        url: '/pages/infiniteScroll/infiniteScroll'
      },
      {
        name: 'Authorize',
        open: true,
        url: '/pages/authorize/authorize'
      }
    ]
  },
  skip: function (ev) {
    let index = ev.currentTarget.dataset.index
    let list = this.data.list
    if (list[index].open) {
      wx.navigateTo({
        url: list[index].url
      })
    }
  }
})
