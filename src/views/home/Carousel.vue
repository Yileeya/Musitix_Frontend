<template>
  <div id="carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        v-for="indicatorIndex in carouselItems.length"
        :key="'indicator' + indicatorIndex"
        type="button"
        data-bs-target="#carousel"
        :data-bs-slide-to="indicatorIndex - 1"
        :class="[{ active: indicatorIndex - 1 === 0 }]"
        aria-current="true"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(item, index) in carouselItems"
        :key="'img' + item._id"
        class="carousel-item"
        :class="[{ active: index === 0 }]"
        @click.prevent="changeRouterPath(item.activity_id)"
      >
        <img :src="item.image" class="w-100" :alt="item.activity_title" />
      </div>
    </div>

    <button
      v-for="i in 2"
      :key="'control-btn' + i"
      :class="[i === 1 ? 'carousel-control-prev' : 'carousel-control-next']"
      type="button"
      data-bs-target="#carousel"
      :data-bs-slide="[i === 1 ? 'prev' : 'next']"
    >
      <span
        :class="[i === 1 ? 'carousel-control-prev-icon' : 'carousel-control-next-icon']"
        aria-hidden="true"
      ></span>
      <span class="visually-hidden">{{ i === 1 ? 'Previous' : 'Next' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Banner } from '@/types/banner/banner'
import { useRouter } from 'vue-router'

defineProps<{
  carouselItems: Banner[]
}>()
const router = useRouter()
const changeRouterPath = (activityId: string) => {
  router.push(`/activity/${activityId}`)
}
</script>

<style scoped lang="scss">
.carousel-inner {
  max-height: 600px;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
</style>
