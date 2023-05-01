<template>
          <form @submit="LoginSubmit">
            <div class="p-4">
              <h6 class="text-center mb-3">會員登入</h6>
              <p class="text-danger text-center mb-2">{{ errorMessage }}</p>
             
              <div class="container">
                <div class="mb-3 row">
                  <label for="email" class="col-auto col-form-label">信箱:</label>
                  <div class="col">
                    <input type="text" class="form-control" name="email" v-model="email" />
                    <span class="text-danger">{{ emailErrorMessage}}</span>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="password" class="col-auto col-form-label">密碼:</label>
                  <div class="col">
                    <input type="password" class="form-control" name="password" v-model="password" />
                    <span class="text-danger">{{ passwordErrorMessage}}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <a href="">忘記密碼</a>
                  </div>

                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitting">登入</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
       
</template>
<script setup lang="ts">

import { useForm,useField } from 'vee-validate'
import { postLogin } from '../../apis/users/login'
import { useRoute, useRouter } from 'vue-router'
import { useUserProfileStore } from '@/stores/user';

const router = useRouter();
const userProfile = useUserProfileStore()
//登入
let errorMessage:string
const simpleSchema = {
  email(value: string) {    
    if (!value) {
      return '信箱為必填';
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return '信箱格式錯誤';
    }
    return true
  },
  password(value: string) {
    if (!value) {
      return '密碼為必填';
    }
    return true;
  },
};
// Create a form context with the validation schema

const { handleSubmit, isSubmitting,errors } = useForm({
  validationSchema: simpleSchema,
});
const { errorMessage: emailErrorMessage, value:email } = useField(() => 'email');
const { errorMessage:passwordErrorMessage,value:password } = useField(() => 'password');
const LoginSubmit = handleSubmit(async(values) => {
  await postLogin(values.email,values.password)
  .then(response=>{       
    localStorage.setItem("Token",response.data.user.token)
    userProfile.SetIsLogin(true)
    router.push("/")
  })
  .catch(error=>{   
    errorMessage = error.response.data.message
    
  })

});


</script>
<style scoped lang="scss">

</style >
