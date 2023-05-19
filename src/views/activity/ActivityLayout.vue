<template>
  <div v-if="activity">
    <activity-info
      :main-image-url="activity.mainImageUrl"
      :title="activity.title"
      :date-range="[activity.startDate, activity.endDate]"
      :sponsor-name="activity.sponsorName"
      :location="activity.location"
      :address="activity.address"
    />
    <div class="activity-intro">
      <html-content :html="activity.HtmlContent" />
    </div>
    <activity-map :map-url="activity.mapUrl" />
    <schedules :schedules="activity.schedules" id="ByTickets" />
    <html-content :html="activity.HtmlNotice" />
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useToast } from 'vue-toastification'
import ActivityInfo from '@/views/activity/ActivityInfo.vue'
import HtmlContent from '@/components/HtmlContent.vue'
import ActivityMap from '@/views/activity/ActivityMap.vue'
import Schedules from '@/views/activity/Schedules.vue'
import { getActivity } from '@/apis/activities/activities'
import type { Activity } from '@/types/activity/activity'
import { pageLoadingStore } from '@/stores/pageLoading'

const pageLoading = pageLoadingStore()
pageLoading.changeLoadingStatus(true)

const route = useRoute()
const router = useRouter()
const routeParamsId = route.params.id.toString()

const activity: Ref<Activity | null> = ref<Activity | null>(null)

const Toast = useToast()
const handleFetchError = () => {
  Toast.error('活動獲取錯誤，跳轉回首頁。')
  activity.value = null
  router.push('/')
}

const fetchActivity = async () => {
  try {
    let res = await getActivity(routeParamsId)
    if (res.status === 200) {
      activity.value = res.data.data
    } else {
      handleFetchError()
    }
  } catch (error) {
    handleFetchError()
  }
  pageLoading.changeLoadingStatus(false)
}

fetchActivity()
</script>

<style scoped lang="scss">
.activity-intro {
  position: relative;
  &::before,
  &::after {
    content: '';
    background-repeat: no-repeat;
    position: absolute;
    z-index: -1;
    max-width: 100%;
  }
  &::before {
    background-image: url(/src/assets/img/yellow_circle.png);
    width: 800px;
    height: 300px;
    top: -80px;
    left: 0;
  }
  &::after {
    background-image: url(/src/assets/img/purple_circle.png);
    width: 425px;
    height: 275px;
    bottom: 0;
    right: 0;
  }
  @media (max-width: 768px) {
    &::after {
      background-image: none;
    }
  }
}
</style>
