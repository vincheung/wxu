class Component {
  constructor(params = {}) {
    Object.assign(this, { params })
    this.init()
  }

  init() {
    this.page = getCurrentPages()[getCurrentPages().length - 1]
    this.setData = this.page.setData.bind(this.page)
    this.params.data && this.initData()
    this.params.methods && this.initMethods()
  }

  isEmptyObject(obj) {
    for (let key in obj) {
      return false
    }
    return true
  }

  initData() {
    const scope = this.params.scope
    const data = this.params.data
    this._data = {}
    if (!this.isEmptyObject(data)) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          if (typeof data[key] === `function`) {
            data[key] = data[key].bind(this)
          } else {
            this._data[key] = data[key]
          }
        }
      }
    }
    this.page.setData({
      [`${scope}`]: this._data
    })
  }

  initMethods() {
    const scope = this.params.scope
    const methods = this.params.methods
    if (!this.isEmptyObject(methods)) {
      for (let key in methods) {
        if (methods.hasOwnProperty(key) && typeof methods[key] === `function`) {
          this[key] = methods[key] = methods[key].bind(this)
          this.page[`${scope}.${key}`] = methods[key]
          this.setData({
            [`${scope}.${key}`]: `${scope}.${key}`
          })
        }
      }
    }
  }

  setShow(duration = 300) {
    this.setData({
      [`${this.params.scope}.wxuShow`]: true
    })
    setTimeout(() => {
      let animation = wx.createAnimation({
        duration: duration,
        timingFunction: 'linear',
      })
      animation.opacity(1).step()
      this.setData({
        [`${this.params.scope}.animation`]: animation.export(),
      })
    }, duration)
  }

  setHide(duration = 300) {
    let animation = wx.createAnimation({
      duration: duration,
      timingFunction: 'linear',
    })
    animation.opacity(0).step()
    this.setData({
      [`${this.params.scope}.animation`]: animation.export(),
    })
    setTimeout(() => {
      this.setData({
        [`${this.params.scope}.wxuShow`]: false
      })
    }, duration)
  }
}

export default Component