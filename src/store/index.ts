import { createPinia } from 'pinia'

export default createPinia()

export { default as useUserStore } from './modules/user'
export { default as useAppStore } from './modules/app'
export { default as useTabBarStore } from './modules/tab-bar'
