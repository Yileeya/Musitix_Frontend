<template>
  <q-r-code-vue3
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
  />
</template>

<script setup lang="ts">
import QRCodeVue3 from 'qrcode-vue3'
defineProps<{
  ticketNumber: string
}>()
</script>
