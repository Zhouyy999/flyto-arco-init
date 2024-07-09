import type { RouteRecordRaw } from 'vue-router'
import {
  MAIN_ROUTE_NAME,
  NOT_FOUND_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
} from '@/router/constants'

export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: LOGIN_ROUTE_NAME,
  component: () => import('@/views/login/index.vue'),
  meta: {
    requiresAuth: false,
  },
}

export const MAIN_ROUTE: RouteRecordRaw = {
  path: '/',
  redirect: 'main',
  component: () => import('@/layout/default-layout.vue'),
  children: [
    {
      path: '/main',
      name: MAIN_ROUTE_NAME,
      component: () => import('@/views/main/index.vue'),
      meta: {
        locale: '主页',
        requiresAuth: false,
      },
    },
  ],
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: NOT_FOUND_ROUTE_NAME,
  component: () => import('@/views/not-found/index.vue'),
}
