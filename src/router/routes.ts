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
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('@/views/login/Regist.vue')
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
      },
      {
        path: 'setPersonInfo',
        name: 'setPersonInfo',
        component: () => import('@/views/member/SetPersonInfo.vue')
      },
      {
        path: 'password',
        name: 'password',
        component: () => import('@/views/member/Password.vue')
      },
      {
        path: 'ticket',
        name: 'ticket',
        component: () => import('@/views/member/Ticket.vue')
      }
    ]
  },
  {
    path: '/booking/:id',
    name: 'booking',
    meta: { requiresAuth: true },
    component: () => import('@/views/booking/BookingLayout.vue')
  }
]
export default routes
