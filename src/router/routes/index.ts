/**
 * 路由参数说明
 *
 * path: !!! 路由 path 路径需完整，因为菜单中所有路由跳转均使用 path 跳转。
 *    如:
 *        父路由 path:'/main'
 *        子路由 path:'/main/page'
 *        孙路由 path:'/main/page/index'
 */
export * from './white'
export { default as AUTH_ROUTES } from './auth'
