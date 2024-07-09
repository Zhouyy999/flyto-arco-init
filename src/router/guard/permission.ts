import type { Router, RouteRecordNormalized } from 'vue-router'
import NProgress from 'nprogress'

import { useAppStore } from '@store'
import { WHITE_LIST, NOT_FOUND_ROUTE_NAME } from '../constants'

export default function setupPremissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const appStore = useAppStore()

    // 获取菜单
    if (appStore.serverMenu.length === 0) {
      await appStore.fetchServerMenuConfig()
    }

    const allMenus = [...appStore.serverMenu, ...WHITE_LIST]

    // 验证当前跳转的页面是否在当前用户所在的菜单中
    let exist = false
    while (allMenus.length > 0 && !exist) {
      const menu = allMenus.shift()
      if (menu?.name === to.name) {
        exist = true
      }

      // 如果有子菜单，加入到 allMenus 中进行校验
      if (menu?.children) {
        allMenus.push(...(menu.children as RouteRecordNormalized[]))
      }
    }

    // 如果不在菜单中，跳转到 404
    if (exist) {
      next()
    } else {
      next({ name: NOT_FOUND_ROUTE_NAME })
    }
    NProgress.done()
  })
}
