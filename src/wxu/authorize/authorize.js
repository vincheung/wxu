import Component from '../component'

const setAuthorize = (scope, data, cb) => {
  if (scope.length === 0) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting) {
          return
        }
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
      setAuthorize(scope.slice(1), data, cb)
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
        if (!data.scope) {
          return
        }
        setAuthorize(data.scope, data.scope, () => {
          typeof cb === `function` && cb()
        })
      }
    }
  })
  component.resolve(data.success)
}

export default authorize