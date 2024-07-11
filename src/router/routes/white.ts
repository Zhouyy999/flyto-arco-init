import type { RouteRecordRaw } from 'vue-router'
import {
  MAIN_ROUTE_NAME,
  NOT_FOUND_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  ROOT_ROUTE_NAME,
  RELOAD_ROUTE_NAME,
} from '../constants'

// 登录
export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: LOGIN_ROUTE_NAME,
  component: () => import('@/views/login/index.vue'),
}

// 404
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: NOT_FOUND_ROUTE_NAME,
  meta: {
    ignoreCache: true,
    title: '页面不存在',
  },
  component: () => import('@/views/not-found/index.vue'),
}

// 主页
export const MAIN_ROUTE: RouteRecordRaw = {
  path: '/main',
  name: MAIN_ROUTE_NAME,
  meta: {
    title: '主页',
  },
  component: () => import('@/views/main/index.vue'),
}

// 刷新重定向
export const RELOAD_ROUTE: RouteRecordRaw = {
  path: '/reload/:path',
  name: RELOAD_ROUTE_NAME,
  meta: {
    // 如果重定向进行不进行缓存，在只有首页一个页面时，然后打开两个及以上的页面，此时进行刷新会报错。没找到原因
    // 目前解决办法：不进行缓存，在页面中通过onActived钩子， 每当激活一次则进行一次重定向
    // ignoreCache: true,
    noTabBar: true,
  },
  component: () => import('@/views/reload/index.vue'),
}

// 框架页
// 404和重定向都在框架页中，非整屏页面
export const LAYOUT_ROUTE: RouteRecordRaw = {
  path: '/',
  name: ROOT_ROUTE_NAME,
  redirect: MAIN_ROUTE_NAME,
  component: () => import('@/layout/default-layout.vue'),
  children: [MAIN_ROUTE, RELOAD_ROUTE, NOT_FOUND_ROUTE],
}