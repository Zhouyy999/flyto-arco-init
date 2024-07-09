import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

import { LOGIN_ROUTE, MAIN_ROUTE } from './routes'
import createRouteGuard from './guard'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [MAIN_ROUTE, LOGIN_ROUTE],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

export default router
