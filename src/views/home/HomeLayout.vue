<template>
  <carousel :carousel-items="carouselItems" />
</template>
<script setup lang="ts">
import Carousel from '@/components/carousel.vue'
import type { CarouselItems } from '@/components/carousel.vue'
import { reactive } from 'vue'

import carouselJson from '@/demoData/home/carouselJson'
const carouselItems: CarouselItems[] = reactive(carouselJson)
</script>
