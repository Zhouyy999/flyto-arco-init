import type { Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import { useUserStore } from '@store'
import useUser from '@/hooks/user'
import { LOGIN_ROUTE_NAME } from '../constants'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()

    // 只要是登录页面，直接放行，并且取消登录
    if (to.name === 'login') {
      useUser().logout()
      next()
    } else {
      const userStore = useUserStore()

      try {
        // 当前使用cookie存储用户数据，每次在页面进入时，先捞取一次用户信息，通过是否成功捞取用户信息来判断当前用户登录是否失效
        // 在未登录的情况下，直接从服务端获取一次用户信息（通过cookie存储的用户数据），查看登录是否失效
        if (!userStore.isLogin) {
          await userStore.updateUserInfo()
        }
        // 依然未登录，抛出异常，跳转登录
        if (!userStore.isLogin) {
          throw new Error('not lpgin')
        }
        next()
      } catch (_e) {
        next({
          name: LOGIN_ROUTE_NAME,
        })
        NProgress.done()
      }
    }
  })
}
