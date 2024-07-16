import request from '@request'
import { UserInfo, LoginData, ServerAuth } from '@types'

export function testApi() {
  return request({
    url: '/api/RobotTest/TestMessage',
    data: {
      Qty: 1,
      ProductName: 'dsASSfdfd',
      ProductSysNo: 123,
    },
  })
}

export function login(data: LoginData) {
  return request<UserInfo>('/api/user/login', {
    data,
  })
}

export function logout() {
  return request('/api/user/logout')
}

export function getUserInfo() {
  return request<UserInfo>('/api/user/info', {
    openLoading: false,
  })
}

export function getMenuList() {
  return request<ServerAuth[]>('/api/user/menu', {
    openLoading: false,
  })
}
