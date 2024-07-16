import { type LoginData } from '@types'
import { login as userLogin, logout as userLogout } from '@/api/user'

import { useUserStore, useAppStore, useTabBarStore } from '@store'
import { removeRouteListener } from '@utils'

export default function useUser() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  const tabBarStore = useTabBarStore()

  async function login(loginForm: LoginData) {
    try {
      const res = await userLogin(loginForm)
      userStore.setUserInfo(res.Data)
    } catch (err) {
      userStore.resetUserInfo()
      throw err
    }
  }

  async function logout() {
    try {
      await userLogout()
    } finally {
      tabBarStore.resetTabList()
      userStore.resetUserInfo()
      removeRouteListener()
      appStore.clearServerMenu()
    }
  }

  return {
    login,
    logout,
  }
}
