import { useUserStore } from '@/store'

// 当前使用cookie存储用户数据，每次在页面进入时，先捞取一次用户信息，通过是否成功捞取用户信息来判断当前用户登录是否失效
export function isLogin(): boolean {
  return useUserStore().userInfo.sysno > 0
}

export default null
