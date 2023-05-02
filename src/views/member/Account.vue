<template>
  <div>
    <h5>帳號管理</h5>
    <div>
      <form @submit="LoginSubmit">
        <div class="p-4">

          <div class="container" v-if="userProfile.UserProfiles != null">
            <div class="mb-3 row">
              <div class="col-12 d-flex">
                <div class="account-img mx-auto">
                  <img :src="pictureUrl" alt="" v-if="pictureUrl != ''">
                  <circle-user-svg v-else />
                </div>
              </div>
              <div class="col-auto mx-auto mt-2">
                <button class="btn btn-primary " type="button" @click="FileInputClick">上傳會員圖片</button>
                <input type="file" hidden ref="fileInput" accept="image/*" @change="FileUpload">
              </div>
              <p class="text-danger text-center col-12">{{FileErrorMessage}}</p>
            </div>
            <div class="mb-3 row">
              <label for="email" class="col-auto col-form-label">信箱:</label>
              <div class="col">
                <input type="text" class="form-control" name="email" :value="userProfile.UserProfiles?.email" disabled />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="username" class="col-auto col-form-label">使用者名稱:</label>
              <div class="col">
                <input type="text" class="form-control" name="username" v-model="username" />

              </div>
            </div>
            <p v-if="errorMessage != ''" class="text-danger text-center">{{ errorMessage }}</p>
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
import { patchProfiles, postUserPicture } from '@/apis/users/profile'

const Router = useRouter()
const Route = useRoute()
const userProfile = useUserProfileStore()
const FileErrorMessage = ref("")
const fileInput = ref<HTMLInputElement|null>(null);
const errorMessage = ref("")
const pictureUrl = ref(userProfile.UserProfiles?.picture)


const { handleSubmit, isSubmitting, errors } = useForm();
const { value: username } = useField(() => 'username');
// console.log(userProfile.UserProfiles?.username)
watch(() => userProfile.UserProfiles, () => {
  username.value = userProfile.UserProfiles?.username
 
}, { immediate: true })

const LoginSubmit = handleSubmit(async (values) => {
  console.log(pictureUrl.value)
  await patchProfiles(values.username, pictureUrl.value ?? "")
    .then(response => {
      alert(response.data.data)
      userProfile.ReloadUserProfiles()
    })
    .catch(error => {
      errorMessage.value = error.response.data.message

    })

});
function FileInputClick(){
  let btn = fileInput.value as HTMLInputElement
  btn.click()
}
function FileUpload(){  
  let btn = fileInput.value as HTMLInputElement
  if(btn && btn.files){
    postUserPicture(btn.files[0])
    .then(Response=>{     
      console.log(Response.data)
      pictureUrl.value = Response.data.data

    })
    .catch(error=>{
      
      FileErrorMessage.value = error.response.data.message 


    })
  }
  
}





</script>
<style scoped lang="scss">
.account-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;

  >* {
    width: 100%;
    height: 100%;
  }
}
</style >
