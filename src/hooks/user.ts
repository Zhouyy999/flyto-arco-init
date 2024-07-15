import { useRouter } from 'vue-router'
import { type LoginData } from '@types'
import { login as userLogin, logout as userLogout } from '@/api/user'

import { useUserStore, useAppStore } from '@store'
import { removeRouteListener } from '@utils'

export default function useUser() {
  const router = useRouter()
  const userStore = useUserStore()
  const appStore = useAppStore()

  async function login(loginForm: LoginData) {
    try {
      const res = await userLogin(loginForm)
      userStore.setUserInfo(res.data)
    } catch (err) {
      userStore.resetUserInfo()
      throw err
    }
  }
  async function logout() {
    try {
      await userLogout()
    } finally {
      userStore.resetUserInfo()
      removeRouteListener()
      appStore.clearServerMenu()

      router.push({
        name: 'login',
      })
    }
  }

  return {
    login,
    logout,
  }
}
