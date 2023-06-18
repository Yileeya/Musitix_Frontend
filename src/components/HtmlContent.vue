<template>
  <div class="container">
    <div v-html="html" class="html-content"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<style scoped lang="scss">
.container {
  padding: 3em 15px;
}
.html-content :deep(h3) {
  color: #0b1697;
  margin-bottom: 15px;
}
.html-content :deep(img) {
  max-width: 480px;
  width: 100%;
  margin-bottom: 15px;
}
.html-content :deep(li) {
  margin: 24px 0;
}
</style>
