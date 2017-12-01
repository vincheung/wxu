import Component from '../component'

const setAuthorize = (wx, scope, cb, data) => {
  if (scope.length === 0) {
    wx.getSetting({
      success(res) {
        const authSetting = res.authSetting
        for (let item of data) {
          let bol = false
          for (let key in authSetting) {
            if (!authSetting[key]) {
              wx.openSetting()
              return
            }
            if (key === item) {
              bol = true
            }
          }
          if (!bol) {
            wx.openSetting()
            return
          }
        }
        cb()
      }
    })
    return
  }
  wx.authorize({
    scope: scope[0],
    complete() {
      setAuthorize(wx, scope.slice(1), cb, data)
    }
  })
}

const authorize = (params = {}) => {
  const data = Object.assign({}, params)
  const component = new Component({
    scope: `wxu.authorize`,
    data: data,
    methods: {
      resolve(cb) {
        let nameSpace = this.page.data
        if (component.isEmptyObject(data)) {
          nameSpace.$show = true
          nameSpace.$authorize = true
          return
        }
        setAuthorize(wx, data.scope, () => {
          if (!nameSpace.$show) {
            if (!nameSpace.$authorize) {
              nameSpace.$authorize = true
              typeof cb === `function` && cb()
            }
          } else {
            typeof cb === `function` && cb()
          }
        }, data.scope)
      }
    }
  })
  component.resolve(data.success)
}

export default authorize