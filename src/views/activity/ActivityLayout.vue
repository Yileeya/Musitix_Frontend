<template>
  <activity-info
    :main-image-url="activity.mainImageUrl"
    :title="activity.title"
    :date-range="[activity.startDate, activity.endDate]"
    :sponsor-name="activity.sponsorName"
  />
  <html-content :html="activity.HtmlContent" />
  <activity-map :map-url="activity.mapUrl" />
  <schedules :schedules="activity.schedules" />
  <html-content :html="activity.HtmlNotice" />
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import activityJson from '@/demoData/activity/activityJson'
import ActivityInfo from '@/views/activity/ActivityInfo.vue'
import HtmlContent from '@/components/HtmlContent.vue'
import ActivityMap from '@/views/activity/ActivityMap.vue'
import Schedules from '@/views/activity/Schedules.vue'
const route = useRoute()
//若無此activityId，則回到首頁
const activity = ref(activityJson)
</script>
