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
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/new_message/NewMessageLayout.vue')
  }
]
export default routes
