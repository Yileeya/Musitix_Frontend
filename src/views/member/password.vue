<template>
  <div class="container account-body">
      <form @submit="PasswordSubmit">         
            
            <div class="mb-3 row">
              <label for="password" class="col-auto col-form-label">原密碼:</label>
              <div class="col">
                <input type="password" class="form-control" name="password" v-model="password"/>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="newPassword" class="col-auto col-form-label">新密碼:</label>
              <div class="col">
                <input type="password" class="form-control" name="newPassword" v-model="newPassword" />

              </div>
            </div>
            <div class="mb-3 row">
              <label for="confirmPassword" class="col-auto col-form-label">新密碼確認:</label>
              <div class="col">
                <input type="password" class="form-control" name="confirmPassword" v-model="confirmPassword" />

              </div>
            </div>
            <p v-if="errorMessage != ''" class="text-danger text-center">{{ errorMessage }}</p>
            <div class="row mt-4">
              <div class="col-12 text-center">
                <button type="submit" class="btn save-btn" :disabled="isSubmitting">修改</button>
              </div>
            </div>
      </form>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserProfileStore } from '@/stores/user'
import { useField, useForm } from 'vee-validate'
import CircleUserSvg from '@/components/icons/CircleUserSvg.vue'
import { patchPassword } from '@/apis/users/profile'

const Router = useRouter()
const Route = useRoute()
const errorMessage = ref("")


const { handleSubmit, isSubmitting, errors } = useForm();
const { value: password } = useField(() => 'password');
const { value: newPassword } = useField(() => 'newPassword');
const { value: confirmPassword } = useField(() => 'confirmPassword');


const PasswordSubmit = handleSubmit(async (values) => {
 
  await patchPassword(password.value as string,newPassword.value as string,confirmPassword.value as string)
    .then(response => {
      alert(response.data.data)      
    })
    .catch(error => {
      errorMessage.value = error.response.data.message

    })

});



</script>
<style scoped lang="scss">
.account-body {
  padding: 40px;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 48px;
  margin-bottom: 20px;
}
.save-btn {
  color: #FFFFFF;
  background-color: var(--primary-color);
  padding: 8px 68px;

  &:hover {
    color: black;
    background-color: var(--warning-color);

  }

}
.col-form-label {
  min-width: 110px;
}
</style >
