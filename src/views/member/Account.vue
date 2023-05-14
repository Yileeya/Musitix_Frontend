<template>
  <div class="container account-body">
    <form @submit="LoginSubmit">
      <div v-if="!userProfile.UserProfiles" class="d-flex">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="container" v-if="userProfile.UserProfiles != null">
        <div class="row">
          <div class="col-lg-auto col-12">
            <div class="account-img-div">
              <div class="account-img">
                <img :src="pictureUrl" alt="" v-if="pictureUrl">
                <circle-user-svg v-else />
              </div>
              <div class="account-img-hover">
                上傳大頭貼
              </div>
              <button class="btn upload-btn" type="button" @click="FileInputClick"><i class="fa fa-camera"></i></button>
              <input type="file" hidden ref="fileInput" accept="image/*" @change="FileUpload">
            </div>
          </div>
          <div class="col-12 col-lg">
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
          </div>
          <div class="col-12">
            <p v-if="errorMessage != ''" class="text-danger text-center">{{ errorMessage }}</p>
            <div class="row mt-4">
              <div class="col-12 text-center">
                <button type="submit" class="btn save-btn" :disabled="isSubmitting">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserProfileStore } from '@/stores/user'
import { useField, useForm } from 'vee-validate'
import CircleUserSvg from '@/components/icons/CircleUserSvg.vue'
import { patchProfiles, postUserPicture } from '@/apis/users/profile'
import { useToast } from 'vue-toastification'

const Toast = useToast()
const userProfile = useUserProfileStore()
const fileInput = ref<HTMLInputElement | null>(null);
const errorMessage = ref("")
const pictureUrl = ref(userProfile.UserProfiles?.picture)
const { handleSubmit, isSubmitting, errors } = useForm();
const { value: username } = useField(() => 'username');

watch(() => userProfile.UserProfiles, () => {
  username.value = userProfile.UserProfiles?.username
  pictureUrl.value = userProfile.UserProfiles?.picture

}, { immediate: true })

const LoginSubmit = handleSubmit(async (values) => {
  await patchProfiles(values.username, pictureUrl.value ?? "")
    .then(response => {
      Toast.success("帳號資訊儲存成功");
      userProfile.ReloadUserProfiles()
    })
    .catch(error => {
      errorMessage.value = error.response.data.message
    })
});
function FileInputClick() {
  let btn = fileInput.value as HTMLInputElement
  btn.click()
}
function FileUpload() {
  let btn = fileInput.value as HTMLInputElement
  if (btn && btn.files) {
    postUserPicture(btn.files[0])
      .then(Response => {
        pictureUrl.value = Response.data.data
        Toast.success("圖片上傳成功，請儲存帳號資訊");
      })
      .catch(error => {
        Toast.error(error.response.data.message)
        errorMessage.value = error.response.data.message
      })
  }
}
</script>
<style scoped lang="scss">
.account-body {
  padding: 40px;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 48px;
  margin-bottom: 20px;
}

.spinner-border {
  color: var(--primary-color);
  margin: auto;
}

.account-img-div {
  position: relative;

  .account-img,
  .account-img-hover {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;

    >* {
      width: 100%;
      height: 100%;
    }
  }

  .account-img-hover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: rgba(black, 0.5);
    color: #FFFFFF;
    justify-content: center;
    align-items: center;
  }

  .upload-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #FFFFFF;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border-color: var(--gray);
    padding: 0;
    z-index: 6;
  }

  &:hover {
    .account-img-hover {
      display: flex;
    }

    .upload-btn {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
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
