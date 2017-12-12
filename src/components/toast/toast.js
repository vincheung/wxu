import Component from '../component'

function toast(params = {}) {
  const PERPETUAL = -1
  const DURATION = 1500
  const DEFAULT = {
    duration: DURATION,
    position: '',
    className: '',
    msg: '',
    icon: '',
    colol: ''
  }
  if (params.icon) {
    const icon = ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear']
    let bol = false
    for (let item of icon) {
      if (params.icon === item) {
        bol = true
      }
    }
    params.icon = bol ? params.icon : ''
  }
  const data = Object.assign({}, DEFAULT, params)
  if (!data.msg && !data.icon) {
    return
  }
  const component = new Component({
    scope: `wxu.toast`,
    data: data,
    methods: {
      show() {
        this.setShow()
      },
      hide(cb) {
        if (data.duration !== PERPETUAL) {
          this.timer = setTimeout(() => {
            this.setHide()
            typeof cb === `function` && cb()
          }, data.duration)
        }
      },
      close() {
        clearTimeout(this.timer)
        this.setHide()
        typeof data.success === `function` && data.success()
      }
    }
  })
  if (data.msg || data.icon) {
    component.show() || component.hide(data.success)
  }
  return component
}

export default toast