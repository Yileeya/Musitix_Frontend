<template>
  <iframe
    :src="mapUrl"
    height="450"
    style="border: 0"
    allowfullscreen="true"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</template>

<script setup lang="ts">
defineProps<{
  mapUrl: string
}>()
</script>

<style scoped lang="scss">
iframe {
  width: 100%;
}
</style>
