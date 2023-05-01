import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeLayout.vue')
  },
  {
    path: '/Login',
    name: 'login',
    component: () => import('@/views/login/LoginLayout.vue')
  }
]
export default routes
