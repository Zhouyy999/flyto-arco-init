import { reactive } from 'vue'
import { defineStore } from 'pinia'
import defaultSettings from '@/config/settings'
import { getMenuList } from '@/api/user'
import { AppState } from '@types'
import { formatListToMenus } from '@utils'
import { MAIN_ROUTE_NAME } from '@/router/constants'

export default defineStore('app', () => {
  const appData = reactive<AppState>({ ...defaultSettings })

  // 更新配置项
  function updateSettings(partial: Partial<AppState>) {
    Object.assign(appData, partial)
  }

  // 切换暗黑和亮色模式
  function toggleTheme(dark: boolean) {
    if (dark) {
      appData.theme = 'dark'
      document.body.setAttribute('arco-theme', 'dark')
    } else {
      appData.theme = 'light'
      document.body.removeAttribute('arco-theme')
    }
  }

  // 切换设备
  function toggleDevice(device: string) {
    appData.device = device
  }
  function toggleMenu(value: boolean) {
    appData.hideMenu = value
  }

  // 获取服务端的角色权限页面
  async function getServerMenu() {
    appData.serverAuthList = await (await getMenuList()).Data

    appData.menuList = [
      // 添加主页
      {
        path: '/main',
        key: MAIN_ROUTE_NAME,
        icon: 'icon-home',
        title: '主页',
        treeCode: '00',
        sysno: 0,
      },
      ...formatListToMenus(appData.serverAuthList),
    ]
  }
  function clearServerMenu() {
    appData.menuList = []
  }

  return {
    appData,
    updateSettings,
    toggleTheme,
    toggleDevice,
    toggleMenu,
    getServerMenu,
    clearServerMenu,
  }
})
