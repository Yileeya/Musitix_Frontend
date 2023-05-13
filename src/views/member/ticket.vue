<template>
  <div>
    <h5>我的票卷</h5>
    <div>
      
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
