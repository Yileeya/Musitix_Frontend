<template>
  <q-r-code-vue3
    v-if="ticketNumber"
    :width="200"
    :height="200"
    :value="ticketNumber"
    :imageOptions="{
      crossOrigin: 'Anonymous',
      hideBackgroundDots: true,
      imageSize: 0.25,
      margin: 5
    }"
    :dotsOptions="{
      type: 'square',
      color: 'black'
    }"
    :cornersSquareOptions="{
      type: 'square'
    }"
    fileExt="png"
    :download="false"
    :image="'favicon.png'"
  />
</template>

<script setup lang="ts">
import QRCodeVue3 from 'qr-code-generator-vue3'
defineProps<{
  ticketNumber: string
}>()
</script>
