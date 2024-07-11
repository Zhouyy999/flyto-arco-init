import type { RouteRecordRaw, RouteMeta } from 'vue-router'

// 应用路由
export interface AppRouteMeta extends RouteMeta {
  // 多页签时，标签的标题
  title: string
  // 是否不进行缓存
  ignoreCache?: boolean
  // 不放在TabBar中显示
  noTabBar?: boolean
}
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'mete'> {
  meta: AppRouteMeta
}

// 应用菜单项
export interface AppMenuRecord {
  title: string
  treeCode: number
  menuKey: string
  isMenu: boolean
  path: string
  icon: string
  status: boolean
}
