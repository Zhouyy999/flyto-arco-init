import type { RouteRecordRaw } from 'vue-router'
import {
  MAIN_ROUTE_NAME,
  NOT_FOUND_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  ROOT_ROUTE_NAME,
  REDIRECT_ROUTE_NAME,
} from '../constants'

/**
 * 路由参数说明
 *
 * path: !!! 路由 path 路径需完整，因为菜单中所有路由跳转均使用 path 跳转。
 *    如:
 *        父路由 path:'/home'
 *        子路由 path:'/home/page'
 *        孙路由 path:'/home/page/index'
 *    首页 path 必须为 '/home'
 * meta: {
 *      title:         菜单的标题 ( 缺少 title 时会使用路由的 path 作为标题)
 *      isHide:        是否隐藏此路由
 *      isKeepAlive:   是否缓存路由
 *      roles:         当前路由权限标识，取角色管理。控制路由显示、隐藏。
 *      icon:          图标 elementUI
 * }
 */

// 所有用户均有以下页面权限
export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: LOGIN_ROUTE_NAME,
  component: () => import('@/views/login/index.vue'),
}

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: NOT_FOUND_ROUTE_NAME,
  meta: {
    ignoreCache: true,
    title: '页面不存在',
  },
  component: () => import('@/views/not-found/index.vue'),
}

export const MAIN_ROUTE: RouteRecordRaw = {
  path: '/',
  name: ROOT_ROUTE_NAME,
  redirect: MAIN_ROUTE_NAME,
  component: () => import('@/layout/default-layout.vue'),
  children: [
    {
      path: '/main',
      name: MAIN_ROUTE_NAME,
      component: () => import('@/views/main/index.vue'),
    },
    {
      path: '/redirect/:path',
      name: REDIRECT_ROUTE_NAME,
      meta: {
        ignoreCache: true,
      },
      component: () => import('@/views/redirect/index.vue'),
    },
    NOT_FOUND_ROUTE,
  ],
}

// 需要进行权限验证的路由
