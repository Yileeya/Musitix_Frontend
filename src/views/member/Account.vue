<template>
  <div>
    <h5>帳號管理</h5>
    <div>
      <form @submit="LoginSubmit">
            <div class="p-4">
              <h6 class="text-center mb-3">會員登入</h6>             
             
              <div class="container" v-if="userProfile.UserProfiles != null">
                <div class="mb-3 row">
                    <div class="account-img mx-auto">
                      <img :src="pictureUrl" alt="" v-if="pictureUrl != ''">
                      <circle-user-svg v-else />
                    </div>
                </div>
                <div class="mb-3 row">
                  <label for="email" class="col-auto col-form-label">信箱:</label>
                  <div class="col">
                    <input type="text" class="form-control" name="email" :value="userProfile.UserProfiles?.email" disabled/>                    
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="username" class="col-auto col-form-label">使用者名稱:</label>
                  <div class="col">
                    <input type="text" class="form-control" name="username" v-model="username" />
                    
                  </div>
                </div>
                <p v-if="errorMessage != ''" class="text-danger text-center">{{errorMessage}}</p>
                <div class="row">                  
                  <div class="col-6 mx-auto">
                    <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitting">儲存</button>
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
import { useRoute, useRouter } from 'vue-router'
import { useUserProfileStore } from '@/stores/user'
import { useField, useForm } from 'vee-validate'
import CircleUserSvg from '@/components/icons/CircleUserSvg.vue'
import { patchProfiles } from '@/apis/users/profile'

const Router = useRouter()
const Route = useRoute()
const userProfile = useUserProfileStore()

const errorMessage = ref("")
const pictureUrl = ref(userProfile.UserProfiles?.picture)


const { handleSubmit, isSubmitting,errors } = useForm();
const {value:username } = useField(() => 'username');
// console.log(userProfile.UserProfiles?.username)
watch(()=>userProfile.UserProfiles,()=>{
  username.value = userProfile.UserProfiles?.username
},{immediate:true})
 
const LoginSubmit = handleSubmit(async(values) => {
  await patchProfiles(values.username,pictureUrl.value??"")
  .then(response=>{      
   alert(response.data.data)
    userProfile.ReloadUserProfiles()    
  })
  .catch(error=>{
    errorMessage.value = error.response.data.message
    
  })

});





</script>
<style scoped lang="scss">

.account-img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  >*{
    width: 100%;
    height: 100%;
  }
}
</style >
