import type { Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'
import useUser from '@/hooks/user'

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
        // 在未登录的情况下，直接从服务端获取一次用户信息（通过cookie存储的用户数据），查看登录是否失效
        if (!isLogin()) {
          await userStore.updateUserInfo()
        }
        // 依然未登录，抛出异常，跳转登录
        if (!isLogin()) {
          throw new Error('not lpgin')
        }
        next()
      } catch (_e) {
        next({
          name: 'login',
        })
      }
    }
  })
}
