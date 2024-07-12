import axios from 'axios'
import request from '@/utils/request'
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
  return axios.post<UserInfo>('/api/user/login', data)
}

export function logout() {
  return axios.post('/api/user/logout')
}

export function getUserInfo() {
  return axios.post<UserInfo>('/api/user/info')
}

export function getMenuList() {
  return axios.post<ServerAuth[]>('/api/user/menu')
}
