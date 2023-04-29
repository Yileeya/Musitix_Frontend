<template>
  <carousel :carousel-items="carouselItems" />
  <search-bar class="container" @change-router-path="changeRouterPath" />
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Carousel from '@/views/home/Carousel.vue'
import type { CarouselItems } from '@/views/home/Carousel.vue'
import carouselJson from '@/demoData/home/carouselJson'
import SearchBar from '@/views/home/SearchBar.vue'

const carouselItems: CarouselItems[] = reactive(carouselJson)

const router = useRouter()
const changeRouterPath = (path: string) => {
  router.push(path)
}
</script>
