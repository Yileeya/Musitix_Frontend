import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeLayout.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginLayout.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/SearchLayout.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/newMessage/NewMessageLayout.vue')
  },
  {
    path: '/activity/:id',
    name: 'activity',
    component: () => import('@/views/activity/ActivityLayout.vue')
  },
  {
    path: '/member',
    component: () => import('@/views/member/MemberLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: { name: 'account' }
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/member/Account.vue')
      }
    ]
  }
]
export default routes
