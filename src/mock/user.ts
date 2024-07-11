import Mock from 'mockjs'
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock'

import { MockParams } from '@/types/mock'

const userInfo = {
  sysno: 1000,
  name: 'admin',
  avatar: '',
  email: 'wangliqun@email.com',
  job: 'frontend',
  jobName: '前端艺术家',
  organization: 'Frontend',
  organizationName: '前端',
  location: 'beijing',
  locationName: '北京',
  introduction: '人潇洒，性温存',
  personalWebsite: 'https://www.arco.design',
  phone: '150****0000',
  registrationDate: '2013-05-10 12:10:00',
  accountId: '15012312300',
  certification: 1,
  role: 'role',
}

setupMock({
  setup() {
    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      return successResponseWrap(userInfo)
    })

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000)
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin')
        return successResponseWrap(userInfo)
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user')
        return successResponseWrap({
          token: '54321',
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 50000)
    })

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null)
    })

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList = [
        {
          SysNo: 6,
          TreeCode: '0104',
          FucntionKey: 'AuthTestMgt',
          FunctionName: '权限测试2',
          IsMenu: 1,
          MenuUrl: '/auth1/mgt1/2',
          MenuIcon: '',
          CommonStatus: 1,
        },
        {
          SysNo: 5,
          TreeCode: '02',
          FucntionKey: 'Auth2',
          FunctionName: '权限管理1',
          IsMenu: 1,
          MenuUrl: '',
          MenuIcon: 'icon-translate',
          CommonStatus: 1,
        },
        {
          SysNo: 4,
          TreeCode: '0103',
          FucntionKey: 'AuthTestMgt',
          FunctionName: '权限测试1',
          IsMenu: 1,
          MenuUrl: '/auth1/mgt/1',
          MenuIcon: '',
          CommonStatus: 1,
        },
        {
          SysNo: 1,
          TreeCode: '01',
          FucntionKey: 'AuthTest',
          FunctionName: '权限测试',
          IsMenu: 1,
          MenuUrl: '',
          MenuIcon: 'icon-attachment',
          CommonStatus: 1,
        },
        {
          SysNo: 2,
          TreeCode: '0101',
          FucntionKey: 'AuthTestMgt',
          FunctionName: '管理页',
          IsMenu: 1,
          MenuUrl: '/auth1/mgt',
          MenuIcon: '',
          CommonStatus: 1,
        },
        {
          SysNo: 3,
          TreeCode: '010101',
          FucntionKey: 'AuthTestDetail',
          FunctionName: '明细页面',
          IsMenu: 0,
          MenuUrl: '/auth1/detail',
          MenuIcon: '',
          CommonStatus: 1,
        },
      ]
      return successResponseWrap(menuList)
    })
  },
})
