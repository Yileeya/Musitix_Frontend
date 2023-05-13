<template>
  <activity-info
    :main-image-url="activity.mainImageUrl"
    :title="activity.title"
    :date-range="[activity.startDate, activity.endDate]"
    :sponsor-name="activity.sponsorName"
  />
  <div class="activity-intro">
    <html-content :html="activity.HtmlContent" />
  </div>
  <activity-map :map-url="activity.mapUrl" />
  <schedules :schedules="activity.schedules" id="ByTickets"/>
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
