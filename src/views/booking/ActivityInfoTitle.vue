<template>
  <section class="activity-info-title">
    <h2>{{ title }}</h2>
    <div class="info-title" v-for="infoTitle in infoTitles" :key="infoTitle.id">
      <div class="title">{{ infoTitle.name }}</div>
      <div>{{ infoTitle.value }}</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { dateFormatUTC } from '@/utils/dateFormat'
import dayjs from 'dayjs'

const props = defineProps<{
  title: string
  startTime: string
  endTime: string
  location: string
  address: string
}>()

const scheduleTime = computed(() => {
  //判斷是否為同天
  let endTime = ''
  const isSameDay = dayjs(props.startTime).isSame(dayjs(props.endTime), 'day')
  const startTime = dateFormatUTC(props.startTime, 'YYYY-MM-DD (dd) HH:mm')
  if (isSameDay) endTime = dateFormatUTC(props.endTime, 'HH:mm')
  else endTime = dateFormatUTC(props.endTime, 'YYYY-MM-DD (dd) HH:mm')

  return startTime + ' — ' + endTime
})

const infoTitles = ref([
  {
    id: 'schedule',
    name: '場次',
    value: scheduleTime
  },
  {
    id: 'location',
    name: '地點',
    value: computed(() => {
      return props.address + (props.location ? ` (${props.location})` : '')
    })
  }
])
</script>

<style scoped lang="scss">
.activity-info-title {
  h2 {
    color: var(--primary-color);
    font-weight: bold;
  }
  .info-title {
    display: flex;
    margin: 1.5em 0;
    .title {
      border-right: 1px solid;
      margin-right: 1em;
      font-weight: bold;
      letter-spacing: 1em;
    }
  }
  @media (max-width: 992px) {
    .info-title {
      flex-direction: column;
      align-items: center;
      .title {
        border-right: none;
        border-bottom: 1px solid;
        width: 100%;
        text-align: center;
        margin: 0 0 1em;
        padding-bottom: 5px;
      }
    }
  }
}
</style>
