Page({
  data: {
    list: [
      {
        name: 'Toast',
        open: true,
        url: '/pages/toast/toast'
      },
      {
        name: 'Infinite Scroll',
        open: false,
        url: ''
      },
      {
        name: 'Popup',
        open: false,
        url: ''
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
