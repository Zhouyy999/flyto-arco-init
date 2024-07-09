// 登录
export const LOGIN_ROUTE_NAME = 'login'
// 404
export const NOT_FOUND_ROUTE_NAME = 'notFound'
// 主页
export const MAIN_ROUTE_NAME = 'main'
// 根页面
export const ROOT_ROUTE_NAME = '/'

// 默认路由
export const DEFAULT_ROUTE_NAME = MAIN_ROUTE_NAME
export const DEFAULT_ROUTE = {
  title: '主页',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/main',
}

// 白名单，任何用户均拥有以下页面权限
export const WHITE_ROUTE_NAMES = [
  LOGIN_ROUTE_NAME,
  MAIN_ROUTE_NAME,
  NOT_FOUND_ROUTE_NAME,
]
