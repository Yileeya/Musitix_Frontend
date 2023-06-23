<template>
  <section class="activity-map">
    <div class="container">
      <h2>活動地點</h2>
      <iframe
        :src="mapUrl"
        height="450"
        style="border: 0"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  mapUrl: string
}>()
</script>

<style scoped lang="scss">
.activity-map {
  background-color: #141c75;
  padding: 2.5em 0;
  h2 {
    color: white;
  }
  iframe {
    width: 100%;
    margin: 2em 0 2em 0;
    border-radius: 1em;
  }
}
</style>
