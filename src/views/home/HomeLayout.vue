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
    :activities="activityAreaItem.data"
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
import type { Activity } from '@/types/activity/activity'
import About from '@/views/home/About.vue'
import { getActivities } from '@/apis/activities/activities'
import { useToast } from 'vue-toastification'

const Toast = useToast()

const carouselItems: CarouselItems[] = reactive(carouselJson)

const router = useRouter()
const changeRouterPath = (path: string) => {
  router.push(path)
}

//獲取活動內容
const hotActivities = ref<Array<Activity>>([])
const upcomingActivities = ref<Array<Activity>>([])
const recentActivities = ref<Array<Activity>>([])

//首頁活動類別
const activitiesAreaItem = reactive([
  {
    tag: 'hot',
    title: '熱門活動',
    titleColor: 'white',
    buttonClass: 'btn-purple',
    bgClass: ['hot'],
    data: hotActivities
  },
  {
    tag: 'up-coming',
    title: '即將開賣',
    titleColor: 'var(--primary-color)',
    buttonClass: 'btn-black',
    bgClass: ['up-coming'],
    data: upcomingActivities
  },
  {
    tag: 'recently',
    title: '近期活動',
    titleColor: 'white',
    buttonClass: 'btn-purple',
    bgClass: ['recently'],
    data: recentActivities
  }
])

async function fetchData() {
  try {
    const [activities] = await Promise.all([getActivities()])

    if (activities.status === 200) {
      let res = activities.data.data
      hotActivities.value = res.hotActivities
      upcomingActivities.value = res.upcomingActivities
      recentActivities.value = res.recentActivities
    }
  } catch (err: any) {
    Toast.error(err.response.data.message)
  }
}

fetchData()
</script>

<style scoped lang="scss">
.activities-area {
  background-repeat: no-repeat;

  &.hot {
    background-color: var(--primary-color);
  }

  &.up-coming {
    background-image: url(@/assets/img/home_coming_soon_bg.png);
  }

  &.recently {
    background-image: url(@/assets/img/home_recently_bg.png);
    background-color: black;
  }

  @media (max-width: 1260px) {
    &.up-coming {
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
