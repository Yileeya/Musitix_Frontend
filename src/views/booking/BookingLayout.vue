<template>
  <div class="booking-layout">
    <steps-title class="container" />
  </div>
</template>

<script setup lang="ts">
import StepsTitle from '@/views/booking/StepsTitle.vue'
</script>
<style scoped lang="scss">
.booking-layout {
  background-color: var(--primary-color);
  padding: 3% 0;
  min-height: inherit;
}
</style>
