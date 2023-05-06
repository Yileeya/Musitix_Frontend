<template>
  <carousel :carousel-items="carouselItems" />
  <search-bar class="container" @change-router-path="changeRouterPath" />
  <news-message class="container" />
  <activities-area
    v-for="activityAreaItem in activitiesAreaItem"
    :key="activityAreaItem.tag"
    :title="activityAreaItem.title"
    :title-color="activityAreaItem.titleColor"
    :button-class="activityAreaItem.buttonClass"
    :class="activityAreaItem.bgClass"
    :activities="activitiesDemo"
    @change-router-path="changeRouterPath"
  />
  <about />
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Carousel from '@/views/home/Carousel.vue'
import type { CarouselItems } from '@/views/home/Carousel.vue'
import carouselJson from '@/demoData/home/carouselJson'
import SearchBar from '@/views/home/SearchBar.vue'
import NewsMessage from '@/views/home/NewsMessage.vue'
import ActivitiesArea from '@/views/home/ActivitiesArea.vue'
import type { Activity } from '@/components/ActivityCard.vue'
import activitiesJson from '@/demoData/home/activitiesJson'
import About from '@/views/home/About.vue'

const carouselItems: CarouselItems[] = reactive(carouselJson)

const router = useRouter()
const changeRouterPath = (path: string) => {
  router.push(path)
}
const activitiesAreaItem = reactive([
  {
    tag: 'popular',
    title: '熱門活動',
    titleColor: 'white',
    buttonClass: 'btn-purple',
    bgClass: ['popular']
  },
  {
    tag: 'coming-soon',
    title: '即將開賣',
    titleColor: 'var(--primary-color)',
    buttonClass: 'btn-black',
    bgClass: ['coming-soon']
  },
  {
    tag: 'recently',
    title: '近期活動',
    titleColor: 'white',
    buttonClass: 'btn-purple',
    bgClass: ['recently']
  }
])
const activitiesDemo = ref<Array<Activity>>([])
activitiesDemo.value = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  ...activitiesJson[0]
}))
</script>

<style scoped lang="scss">
.activities-area {
  background-repeat: no-repeat;

  &.popular {
    background-color: var(--primary-color);
  }

  &.coming-soon {
    background-image: url(@/assets/img/home_coming_soon_bg.png);
  }

  &.recently {
    background-image: url(@/assets/img/home_recently_bg.png);
    background-color: black;
  }

  @media (max-width: 1260px) {
    &.coming-soon {
      background-image: url(@/assets/img/home_coming_soon_phone_bg.png);
    }
    &.recently {
      background-image: url(/src/assets/img/home_recently_phone_bg.png);
      background-size: 100%;
    }
  }
}

.about-area {
  background-repeat: no-repeat;
  background-image: url(@/assets/img/home_about_bg.png);
  @media (max-width: 992px) {
    background-image: url(@/assets/img/home_about_phone_bg.png);
    background-position: center;
  }
}
</style>
