<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoadingLayout from '@/components/LoadingLayout.vue'

import { pageLoadingStore } from '@/stores/pageLoading'
const pageLoading = pageLoadingStore()
const loading = computed(() => pageLoading.loading)
</script>

<template>
  <Navbar />
  <div class="app-layout">
    <RouterView />
  </div>
  <AppFooter />
  <Transition name="fade">
    <loading-layout v-if="loading" />
  </Transition>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
