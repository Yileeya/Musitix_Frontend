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
        :key="'img' + item.id"
        class="carousel-item"
        :class="[{ active: index === 0 }]"
      >
        <img :src="item.imageUrl" class="w-100" :alt="item.title" />
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
export interface CarouselItems {
  id: number | string
  title: string
  imageUrl: string
  activityUrl: string
}

defineProps<{
  carouselItems: CarouselItems[]
}>()
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
