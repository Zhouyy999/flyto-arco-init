import type { RouteRecordRaw } from 'vue-router'

const AUTH_ROUTES: RouteRecordRaw[] = [
  {
    path: '/auth1/mgt/:type*',
    name: 'AuthTestMgt',
    meta: {
      title: '权限测试页面',
    },
    component: () => import('@/views/auth1/mgt.vue'),
  },
  {
    path: '/auth1/detail/:sysno',
    name: 'AuthTestDetail',
    meta: {
      title: '权限页面明细',
    },
    component: () => import('@/views/auth1/detail.vue'),
  },
]

export default AUTH_ROUTES
