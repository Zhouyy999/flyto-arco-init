import type { Router, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'

import { useAppStore } from '@store'
import { ServerMenu } from '@types'
import { ROOT_ROUTE_NAME, LOGIN_ROUTE_NAME } from '../constants'
import { NOT_FOUND_ROUTE } from '../routes'

// 获取所有的页面
const modules = import.meta.glob('../../views/**/*.vue')
const NotFound = () => import('@/views/not-found/index.vue')

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

        // 菜单没有对应的页面，定向到 404
        const route: RouteRecordRaw = modules[`../../views${menu?.path}.vue`]
          ? {
              path: menu?.url || menu?.path || '',
              name: menu?.name,
              meta: menu?.meta || {},
              children: menu?.children || [],
              component: modules[`../../views${menu?.path}.vue`],
            }
          : {
              path: menu?.path || '',
              name: menu?.name,
              meta: {
                ...menu?.meta,
                ignoreCache: true,
              },
              children: menu?.children || [],
              component: NotFound,
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
          allMenus.push(...(route.children as ServerMenu[]))
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
