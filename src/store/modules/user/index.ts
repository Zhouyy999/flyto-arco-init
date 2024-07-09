import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'
import type { UserInfo } from '@types'

const initUserInfo: UserInfo = {
  sysno: 0,
  name: undefined,
  avatar: undefined,
  job: undefined,
  organization: undefined,
  location: undefined,
  email: undefined,
  introduction: undefined,
  personalWebsite: undefined,
  jobName: undefined,
  organizationName: undefined,
  locationName: undefined,
  phone: undefined,
  registrationDate: undefined,
  accountId: undefined,
  certification: undefined,
  role: '',
}

// 用户信息
export default defineStore('user', () => {
  const userInfo = ref<UserInfo>({ ...initUserInfo })

  function setUserInfo(partial: Partial<UserInfo>) {
    userInfo.value = { ...userInfo.value, ...partial }
  }
  function resetUserInfo() {
    userInfo.value = { ...initUserInfo }
  }
  async function updateUserInfo() {
    const data = (await getUserInfo()).data as UserInfo
    data.sysno = 111

    setUserInfo(data)
  }

  return {
    userInfo,
    setUserInfo,
    resetUserInfo,
    updateUserInfo,
  }
})

// const useUserStore1 = defineStore('user', {
//   state: (): UserInfo => ({
//     sysno: 0,
//     name: undefined,
//     avatar: undefined,
//     job: undefined,
//     organization: undefined,
//     location: undefined,
//     email: undefined,
//     introduction: undefined,
//     personalWebsite: undefined,
//     jobName: undefined,
//     organizationName: undefined,
//     locationName: undefined,
//     phone: undefined,
//     registrationDate: undefined,
//     accountId: undefined,
//     certification: undefined,
//     role: '',
//   }),

//   getters: {
//     userInfo(state: UserInfo): UserInfo {
//       return { ...state }
//     },
//   },

//   actions: {
//     // Set user's information
//     setInfo(partial: Partial<UserInfo>) {
//       this.$patch(partial)
//     },

//     // Reset user's information
//     resetInfo() {
//       this.$reset()
//     },

//     // Get user's information
//     async info() {
//       const res = await getUserInfo()

//       this.setInfo(res.data)
//     },

//     // Login
//     async login(loginForm: LoginData) {
//       try {
//         const res = await userLogin(loginForm)
//         setToken(res.data.token)
//       } catch (err) {
//         clearToken()
//         throw err
//       }
//     },
//     logoutCallBack() {
//       const appStore = useAppStore()
//       this.resetInfo()
//       clearToken()
//       removeRouteListener()
//       appStore.clearServerMenu()
//     },
//     // Logout
//     async logout() {
//       try {
//         await userLogout()
//       } finally {
//         this.logoutCallBack()
//       }
//     },
//   },
// })
