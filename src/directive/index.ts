import { App } from 'vue'
import permission from './permission'

export default {
  install(App: App) {
    App.directive('permission', permission)
  },
}
