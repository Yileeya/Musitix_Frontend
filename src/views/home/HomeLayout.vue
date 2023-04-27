<template>
  <carousel :carousel-items="carouselItems" />
</template>
<script setup lang="ts">
import Carousel from '@/views/home/Carousel.vue'
import type { CarouselItems } from '@/views/home/Carousel.vue'
import { reactive } from 'vue'

import carouselJson from '@/demoData/home/carouselJson'

const carouselItems: CarouselItems[] = reactive(carouselJson)
</script>
