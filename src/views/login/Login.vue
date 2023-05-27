<template>
  <div class="bg">
    <div class="container container-body">
      <form @submit="LoginSubmit">
        <div class="p-4">
          <h2 class="title">會員登入</h2>
          <p class="text-danger text-center mb-2">{{ errorMessage }}</p>
          <div class="container">
            <div class="mb-3 row">
              <label for="email" class="col-auto col-form-label">信箱:</label>
              <div class="col">
                <input type="text" class="form-control" name="email" v-model="email" />
                <span class="text-danger">{{ emailErrorMessage }}</span>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="password" class="col-auto col-form-label">密碼:</label>
              <div class="col">
                <input type="password" class="form-control" name="password" v-model="password" />
                <a href="" class="forget-password-link">忘記密碼</a>
                <span class="text-danger">{{ passwordErrorMessage }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-center">
                <button type="submit" class="btn login-btn" :disabled="isSubmitting">登入</button>
              </div>
              <div class="col-12 text-center mt-2">
                <a :href="API_URL + '/google'" class="google-login-link">使用Google登入</a>
              </div>
              <div class="col-12 text-center mt-2">
                <RouterLink :to="'/regist'" class="regist-link">註冊會員</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { getLoginWithGoogle, postLogin } from '@/apis/users/login'
import { useRoute, useRouter } from 'vue-router'
import { useUserProfileStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import { pageLoadingStore } from '@/stores/pageLoading'
import { API_URL } from '@/utils/config'
import { isString, isEmpty, has } from 'lodash'

const route = useRoute()
const router = useRouter()
const Toast = useToast()
const userProfile = useUserProfileStore()

// 若有googleAuthCode，處理google登入
const googleAuthCode = route.query['googleAuthCode'] as string
if (!!googleAuthCode && isString(googleAuthCode)) {
  const pageLoading = pageLoadingStore()
  pageLoading.changeLoadingStatus(true)

  // 清除舊token
  localStorage.removeItem('Token')
  userProfile.SetIsLogin(false)

  getLoginWithGoogle(googleAuthCode)
    .then((response) => {
      localStorage.setItem('Token', response.data.user.token)
      userProfile.SetIsLogin(true)
      Toast.success('Google登入成功')
      redirectRoute()
    })
    .catch((error) => {
      pageLoading.changeLoadingStatus(false)
      errorMessage = error.response.data.message
      Toast.error(error.response.data.message)
      router.replace({ path: '/login' })
    })
}

//登入
let errorMessage: string
const simpleSchema = {
  email(value: string) {
    if (!value) {
      return '信箱為必填'
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value)) {
      return '信箱格式錯誤'
    }
    return true
  },
  password(value: string) {
    if (!value) {
      return '密碼為必填'
    }
    return true
  }
}
// Create a form context with the validation schema

const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: simpleSchema
})
const { errorMessage: emailErrorMessage, value: email } = useField(() => 'email')
const { errorMessage: passwordErrorMessage, value: password } = useField(() => 'password')
const LoginSubmit = handleSubmit(async (values) => {
  await postLogin(values.email, values.password)
    .then((response) => {
      Toast.success('登入成功')
      localStorage.setItem('Token', response.data.user.token)
      userProfile.SetIsLogin(true)
      redirectRoute()
    })
    .catch((error) => {
      errorMessage = error.response.data.message
      Toast.error(error.response.data.message)
    })
})

const redirectRoute = () => {
  const routeQuery = route.query
  // 確認是否需轉跳路由
  const isRedirect = !(isEmpty(routeQuery) && has(routeQuery, 'redirect'))
  if (!isRedirect) {
    // 回首頁
    router.push('/')
  } else {
    const nextRoute = `/${routeQuery.redirect}` + (routeQuery.id ? `/${routeQuery.id}` : '')
    router.push(nextRoute)
  }
}
</script>
<style scoped lang="scss">
.title {
  color: var(--primary-color);
  margin-bottom: 32px;
  font-weight: bold;
}

.bg {
  background-color: var(--primary-color);
  min-height: inherit;
  margin: 0;
  display: flex;
}

.container-body {
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 48px;

  overflow: hidden;
  width: 40%;
  min-width: 600px;
  margin: auto;
}

.forget-password-link {
  display: block;
  text-align: end;
  text-decoration: none;
  color: var(--primary-color);

  &:hover {
    text-decoration: underline;
  }
}

.login-btn {
  color: #ffffff;
  background-color: var(--primary-color);
  padding: 8px 68px;

  &:hover {
    color: black;
    background-color: var(--warning-color);
  }
}

.regist-link,
.google-login-link {
  display: block;
  text-decoration: none;
  color: var(--primary-color);

  &:hover {
    text-decoration: underline;
  }
}
</style>
