import * as user from './modules/user'

const apiObj = {
  user
}

const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
