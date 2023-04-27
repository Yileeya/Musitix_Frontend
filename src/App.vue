<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <Navbar />
  <div class="app-layout">
    <RouterView />
  </div>
  <AppFooter />
</template>
