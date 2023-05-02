<template>
  <div>
    <h4>會員專區</h4>
    <div class="container">
      <div class="row">
        <div class="col-3 border">
          <ul>
            <li v-for="member in  memberSide">
              <RouterLink :to="member.link">
                {{ member.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="col-9">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const Router = useRouter()
const Route = useRoute()

const memberSide = ref([
  {
    name: '帳號管理',
    link: '/member/account'
  },
  {
    name: '我的票卷',
    link: '/member/ticket'
  },
  {
    name: '預填資料設定',
    link: '/member/setPersonInfo'
  },
  {
    name: '密碼修改',
    link: '/member/password'
  }
])
console.log(Route)



</script>
<style scoped lang="scss"></style >
