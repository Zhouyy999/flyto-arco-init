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
    setUserInfo(data)
  }

  return {
    userInfo,
    setUserInfo,
    resetUserInfo,
    updateUserInfo,
  }
})
