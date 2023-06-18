import type { RouteLocationNormalized } from 'vue-router'
import { useToast } from 'vue-toastification'
const Toast = useToast()

export function beforeEach(to: RouteLocationNormalized, from: any, next: any) {
  const isLoggedIn = localStorage.getItem('Token')
  // 判斷是否為需要驗證權限的路由
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 判斷是否已經登入
    if (!isLoggedIn) {
      // 如果未登入，轉到登入頁面
      Toast.error('尚未登入，跳轉至登入頁。')
      next({ name: 'login' })
    } else {
      // 如果已經登入，繼續前往目標路由
      next()
    }
  } else {
    // 已登入，不可再進到login頁面
    if (isLoggedIn && to.name === 'login') {
      next('/')
      return
    }
    // 如果不需要驗證權限，直接前往目標路由
    next()
  }
}
