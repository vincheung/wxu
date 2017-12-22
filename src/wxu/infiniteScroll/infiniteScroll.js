import Component from '../component'

function infiniteScroll(params = {}) {
  const DEFAULT = {
    name: '',
    msg: '加载中...',
    doneMsg: '已无更多',
    spinnerType: 'fading-circle',
    className: ''
  }
  const data = Object.assign({}, DEFAULT, params)
  const component = new Component({
    scope: `wxu.infiniteScroll`,
    data: data,
    methods: {
      done(params) {
        if (!params) {
          this.setData({
            [`${this.params.scope}.infiniteScrollShow`]: false
          })
        } else {
          this.setData({
            [`${this.params.scope}.doneEnd`]: true,
            [`${this.params.scope}.spinnerType`]: false,
            [`${this.params.scope}.msg`]: data.doneMsg
          })
        }
      },
      loadMore(...params) {
        if (!this.page[data.name] || this.page.data.wxu.infiniteScroll.doneEnd) {
          return
        }
        this.setData({
          [`${this.params.scope}.infiniteScrollShow`]: true
        })
        this.page[data.name](this.done, ...params)
      },
      setLoadMore() {
        this.page.loadMore = this.loadMore
      }
    }
  })
  component.setLoadMore()
}

export default infiniteScroll