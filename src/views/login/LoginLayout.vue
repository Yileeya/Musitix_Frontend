<template>
  <div class="d-flex login-body">
    <div class="mx-auto my-5">
      <div class="rounded-2 bg-primary bg-opacity-25 ">
        <div class="d-flex">
          <a class="region-btn" :class="region == 'login' ? 'active' : ''" @click.prevent="region = 'login'">
            <span>會員登入</span>
          </a>
          <a class="region-btn" :class="region !== 'login' ? 'active' : ''" @click.prevent="region = 'regist'">
            <span>會員註冊</span>
          </a>
        </div>
        <template v-if="region == 'login'">
          <LoginRegion></LoginRegion>
        </template>
        <template v-else>
         <RegistRegion></RegistRegion>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoginRegion from './Login.vue'
import RegistRegion from './Regist.vue'

const Router = useRouter()
const Route = useRoute()
//登入/註冊切換
const region = ref(Route.query.action ?? 'login')
watch(region, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    Router.replace({ query: { action: newValue } })
  }
}, { immediate: true })



</script>
<style scoped lang="scss">
.login-body {
  >div {
    width: 40%;
    min-width: 600px;
  }
}

.region-btn {
  padding: 20px;
  text-align: center;
  display: block;
  width: 50%;
  cursor: pointer;
  text-decoration: none;
  background-color: #BCF2B7;

  &:hover {
    background-color: darken($color: #99E3C8, $amount: 30%);
  }

  &.active {
    background-color: #99E3C8;
    cursor: auto;
  }
}
</style >
