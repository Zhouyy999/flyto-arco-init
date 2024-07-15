import type { Router } from 'vue-router'
import NProgress from 'nprogress'

import { useAppStore } from '@store'
import { ROOT_ROUTE_NAME, LOGIN_ROUTE_NAME } from '../constants'
import { AUTH_ROUTES, NOT_FOUND_ROUTE } from '../routes'

export default function setupPremissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    if (to.name === LOGIN_ROUTE_NAME) {
      next()
      NProgress.done()
      return
    }

    const appStore = useAppStore()
    // 获取菜单
    if (appStore.appData.menuList.length === 0) {
      try {
        await appStore.getServerMenu()
        const { serverAuthList } = appStore.appData
        const localAuthRoutesList = AUTH_ROUTES

        serverAuthList.forEach(auth => {
          // 返回的权限项，除非有特定的逻辑，否则均嵌套在 "/" 根路由的children下
          if (auth.MenuUrl && !router.hasRoute(auth.FucntionKey)) {
            const route = localAuthRoutesList.find(
              o => o.name === auth.FucntionKey,
            )

            if (route) {
              router.addRoute(ROOT_ROUTE_NAME, route)
            }
          }
        })

        if (
          to.name === NOT_FOUND_ROUTE.name &&
          to.path !== NOT_FOUND_ROUTE.path
        ) {
          next(to.path)
          return
        }
      } finally {
        NProgress.done()
      }
    }

    next()

    NProgress.done()
  })
}
