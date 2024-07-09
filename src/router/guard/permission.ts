import type { Router, RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'

import { useAppStore } from '@store'
import { ROOT_ROUTE_NAME, LOGIN_ROUTE_NAME } from '../constants'
import { NOT_FOUND_ROUTE } from '../routes'

export default function setupPremissionGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    if (to.name === LOGIN_ROUTE_NAME) {
      next()
      NProgress.done()
      return
    }

    const appStore = useAppStore()
    // 获取菜单
    if (appStore.serverMenu.length === 0) {
      await appStore.fetchServerMenuConfig()

      const allMenus = [...appStore.serverMenu]

      let isPageAuth = false
      while (allMenus.length > 0) {
        const menu = allMenus.shift()
        const route: RouteRecordRaw = {
          path: menu?.path || '',
          name: menu?.name,
          meta: menu?.meta || {},
          children: menu?.children || [],
          component: () => import(`/src/views${menu?.path}.vue`),
        }

        // 具有path属性，且children为空或者null，则添加路由
        // 服务端返回的路由，均嵌套在 "/" 根路由的children下
        if (
          route.path &&
          route.children.length === 0 &&
          !router.hasRoute(menu?.name as string)
        ) {
          router.addRoute(ROOT_ROUTE_NAME, route)
        }

        // 如果有子菜单，加入到 allMenus 中进行校验
        if (route.children.length > 0) {
          allMenus.push(...(route.children as RouteRecordNormalized[]))
        }

        if (!isPageAuth && to.name === route.name) {
          isPageAuth = true
        }
      }

      // 如果name为notfound，但是path不是notfound的路径，则重定向到当前to.path
      if (
        to.name === NOT_FOUND_ROUTE.name &&
        to.path !== NOT_FOUND_ROUTE.path
      ) {
        next(to.path)
        return
      }
    }

    next()

    NProgress.done()
  })
}
