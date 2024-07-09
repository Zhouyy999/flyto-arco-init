import type { RouteRecordRaw } from 'vue-router'
import {
  MAIN_ROUTE_NAME,
  NOT_FOUND_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  ROOT_ROUTE_NAME,
} from '@/router/constants'

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: LOGIN_ROUTE_NAME,
  component: () => import('@/views/login/index.vue'),
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: NOT_FOUND_ROUTE_NAME,
  meta: {
    locale: '错误页面',
  },
  component: () => import('@/views/not-found/index.vue'),
}

export const MAIN_ROUTE: RouteRecordRaw = {
  name: ROOT_ROUTE_NAME,
  path: '/',
  redirect: MAIN_ROUTE_NAME,
  component: () => import('@/layout/default-layout.vue'),
  children: [
    {
      path: '/main',
      name: MAIN_ROUTE_NAME,
      component: () => import('@/views/main/index.vue'),
    },
    NOT_FOUND_ROUTE,
  ],
}
