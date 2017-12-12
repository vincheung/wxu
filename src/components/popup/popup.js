import Component from '../component'

function popup(params = {}) {
  const PERPETUAL = -1
  const DURATION = 1500
  const DEFAULT = {
    duration: DURATION,
    type: 'default',
    className: '',
    msg: '',
    buttonType: '',
    plain: ''
  }
  const data = Object.assign({}, DEFAULT, params)
  if (!data.msg) {
    return
  }
  const component = new Component({
    scope: `wxu.popup`,
    data: data,
    methods: {
      show(duration = 300) {
        let animation = wx.createAnimation({
          duration: duration,
          timingFunction: 'ease',
        })
        this.setData({
          [`${this.params.scope}.wxuShow`]: true,
          [`${this.params.scope}.animationPopup`]: animation.translateY('-100%').step().export()
        })
        setTimeout(() => {
          this.setData({
            [`${this.params.scope}.animationPopup`]: animation.translateY(0).step().export()
          })
        }, duration)
      },
      hide(cb, duration = 300) {
        if (data.duration !== PERPETUAL) {
          this.timer = setTimeout(() => {
            let animation = wx.createAnimation({
              duration: duration,
              timingFunction: 'ease',
            })
            this.setData({
              [`${this.params.scope}.animationPopup`]: animation.translateY('-100%').step().export(),
            })
            setTimeout(() => {
              this.setData({
                [`${this.params.scope}.wxuShow`]: false
              })
              typeof cb === `function` && cb()
            }, duration)
          }, data.duration)
        }
      },
      showButton(duration = 300) {
        this.page.hideButton = this.hideButton
        let animation = wx.createAnimation({
          duration: duration,
          timingFunction: 'linear',
        })
        this.setData({
          [`${this.params.scope}.wxuPopupButtonShow`]: true,
          [`${this.params.scope}.animationPopupButton`]: animation.translateX('100%').step().export()
        })
        setTimeout(() => {
          animation.translateX(0).step()
          this.setData({
            [`${this.params.scope}.animationPopupButton`]: animation.export(),
          })
        }, duration)
      },
      hideButton() {
        let animation = wx.createAnimation()
        animation.translateX('100%').step()
        this.setData({
          [`${this.params.scope}.animationPopupButton`]: animation.export()
        })
        this.timer = setTimeout(() => {
          this.setData({
            [`${this.params.scope}.wxuPopupButtonShow`]: false
          })
          typeof data.success === `function` && data.success()
        }, 300)
      },
      close() {
        clearTimeout(this.timer)
        if (data.type === 'default') {
          this.setHide()
          typeof data.success === `function` && data.success()
        } else if (data.type === 'button') {
          this.hideButton()
        }
      }
    }
  })
  if (data.type === 'default') {
    component.show() || component.hide(data.success)
  } else if (data.type === 'button') {
    component.showButton()
  }
  return component
}

export default popup