import { computed, reactive } from 'vue'
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
  const userInfo = reactive<UserInfo>({ ...initUserInfo })

  const isLogin = computed<boolean>(() => userInfo.sysno > 0)

  function setUserInfo(partial: Partial<UserInfo>) {
    Object.assign(userInfo, partial)
  }
  function resetUserInfo() {
    Object.assign(userInfo, initUserInfo)
  }
  async function updateUserInfo() {
    const data = (await getUserInfo()).Data
    setUserInfo(data)
  }

  return {
    userInfo,
    isLogin,
    setUserInfo,
    resetUserInfo,
    updateUserInfo,
  }
})
