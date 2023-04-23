<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/navbar.vue'
import AppFooter from '@/components/appFooter.vue'
</script>

<template>
  <Navbar />
  <div class="app-layout">
    <RouterView />
  </div>
  <AppFooter />
</template>
