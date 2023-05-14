<template>
  <div class="bg">
  <div class="container container-body ">
    <form @submit="RegistSubmit">
          <div class="p-4">
            <h2 class="title">會員註冊</h2>          
            <p class="text-danger text-center mb-2">{{ errorMessage }}</p>
             
              <div class="container">
                <div class="mb-3 row">
                  <label for="username" class="col-auto col-form-label">暱稱:</label>
                  <div class="col">
                    <input type="text" class="form-control" name="username" v-model="username" />
                    <span class="text-danger">{{ usernameErrorMessage}}</span>
                  </div>
                </div>
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
                <div class="mb-3 row">
                  <label for="confirmPassword" class="col-auto col-form-label">確認密碼:</label>
                  <div class="col">
                    <input type="password" class="form-control" name="confirmPassword" v-model="confirmPassword" />
                    <span class="text-danger">{{ confirmPasswordErrorMessage}}</span>
                  </div>
                </div>
                <div class="row">                  
                  <div class="col-12 text-center mt-3">
                    <button type="submit" class="btn regist-btn" :disabled="isSubmitting">註冊</button>
                  </div>
                  <div class="col-12 text-center mt-2">
                     <RouterLink :to="'/login'" class="login-link" >登入會員</RouterLink> 
                  </div>                  
                </div>
              </div>
          </div> 
        </form>    
      </div>
    </div>  
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useForm,useField } from 'vee-validate';
import { postRegist } from '../../apis/users/login'
import { useRoute, useRouter } from 'vue-router'
import { useUserProfileStore } from '@/stores/user';
import { useToast } from 'vue-toastification';

//登入
const router = useRouter();
const userProfile = useUserProfileStore()
const Toast = useToast()
let errorMessage = ref("")

// Create a form context with the validation schema
const simpleSchema = {
  username(value: string) {
    if (!value) {
      return '暱稱為必填';
    }
    return true;
  },
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
  confirmPassword(value: string) {
    if (!value) {
      return '確認密碼為必填';
    }
    if(value != password.value){
      return '密碼與確認密碼不符';
    }
    return true;
  },
};
const { handleSubmit, isSubmitting,errors } = useForm({
  validationSchema: simpleSchema,
});
const { errorMessage: usernameErrorMessage, value:username } = useField(() => 'username');
const { errorMessage: emailErrorMessage, value:email } = useField(() => 'email');
const { errorMessage:passwordErrorMessage,value:password } = useField(() => 'password');
const { errorMessage:confirmPasswordErrorMessage,value:confirmPassword } = useField(() => 'confirmPassword');

const RegistSubmit = handleSubmit(async(values) => {
  await postRegist(values.username,values.email,values.password,values.confirmPassword)
  .then(response=>{   
    errorMessage.value = ""   
    Toast.success("註冊成功") 
    router.push({path: "/login",force:true})
    router.go(0)
  })
  .catch(error=>{
    errorMessage.value = error.response.data.message    
    Toast.error("error.response.data.message")
  })

});


</script>
<style scoped lang="scss">
.col-form-label{
  min-width: 100px;
}
.title{
  color: var(--primary-color);
margin-bottom: 32px;
font-weight: bold;
}
  .bg{
    background-color: var(--primary-color);
    min-height: inherit;   
    margin: 0;     
    display: flex;
  }
  .container-body{
    background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 48px;
  
  overflow: hidden;
  width: 40%;
    min-width: 600px;
    margin: auto;
  }
  .regist-btn{
    color: #FFFFFF;
  background-color: var(--primary-color);
  padding: 8px 68px;

  &:hover {
    color: black;
    background-color: var(--warning-color);

  }
  }
  .login-link{
    display: block;    
    text-decoration: none;
    color: var(--primary-color);
    &:hover{
      text-decoration: underline;
    }
  }
</style >
