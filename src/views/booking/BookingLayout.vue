<template>
  <div class="booking-layout">
    <steps-title class="container" />
    <div class="container">
      <div v-if="!_.isEmpty(activitySchedule)" class="white-section">
        <activity-info-title
          :title="activitySchedule.title"
          :start-time="activitySchedule.schedule.startTime"
          :end-time="activitySchedule.schedule.endTime"
          :address="activitySchedule.address"
          :location="activitySchedule.location"
        />
        <schedule-ticket
          ref="scheduleTicket"
          :props-tickets="activitySchedule.schedule.ticketCategories"
        />
      </div>
      <subscriber-information
        class="white-section"
        ref="subscriberInformation"
        :props-pre-filled-info="preFilledInfoDemo"
      />
    </div>
    <check-privacy-policy class="text-center" v-model="checkPrivacy" />
    <div class="text-center btn-area container">
      <button class="btn btn-purple" @click="reBack">取消</button>
      <button class="btn btn-purple" @click="submitForm" :disabled="!checkPrivacy">確認</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, toRef } from 'vue'
import { useToast } from 'vue-toastification'
import preFilledInfoDemo from '@/demoData/preFilledInfoDemo'
import StepsTitle from '@/views/booking/StepsTitle.vue'
import ActivityInfoTitle from '@/views/booking/ActivityInfoTitle.vue'
import ScheduleTicket from '@/views/booking/ScheduleTicket.vue'
import SubscriberInformation from '@/views/booking/SubscriberInformation.vue'
import { useRoute, useRouter } from 'vue-router'
import CheckPrivacyPolicy from '@/views/booking/CheckPrivacyPolicy.vue'
import { getActivitySchedule } from '@/apis/activities/activities'
import _ from 'lodash'
import type { ActivitySchedule } from '@/types/activity/activitySchedule'
import { pageLoadingStore } from '@/stores/pageLoading'
import { bookingTicketStore } from '@/stores/bookingTicket'

const pageLoading = pageLoadingStore()
pageLoading.changeLoadingStatus(true)

//設定子層項目，為能獲取子層function
defineComponent({
  components: {
    'schedule-ticket': ScheduleTicket,
    'subscriber-information': SubscriberInformation
  }
})

const scheduleTicket = ref(null)
const scheduleTicketInstance = toRef(scheduleTicket, 'value')
const subscriberInformation = ref(null)
const subscriberInformationInstance = toRef(subscriberInformation, 'value')

const route = useRoute()
const router = useRouter()
const routeParamsId = route.params.id.toString()

//設定資料
const checkPrivacy = ref<boolean>(false)
const activitySchedule = ref<ActivitySchedule>({} as ActivitySchedule)

// 取消，回上一頁
const reBack = () => {
  router.go(-1)
}

// 確定
const bookingTicket = bookingTicketStore()
const submitForm = async () => {
  const scheduleTicketValidateResult = await (scheduleTicketInstance.value as any)?.validate()
  const subscriberInformationValidateResult = await (
    subscriberInformationInstance.value as any
  )?.validate()
  if (!scheduleTicketValidateResult || !subscriberInformationValidateResult) return

  const bookingTicketResult = bookingTicket.ticketList
  if (!bookingTicketResult.length) {
    //無選擇票數
    Toast.warning('請選擇票數！')
    return
  }
  console.log('pass')
}

const Toast = useToast()
async function fetchData() {
  try {
    const [activityScheduleResult] = await Promise.all([getActivitySchedule(routeParamsId)])
    if (activityScheduleResult.status === 200) {
      activitySchedule.value = activityScheduleResult.data.data
    }
  } catch (err: any) {
    const errorMsg = `${err.response.data.message}，跳轉回首頁。`
    Toast.error(errorMsg)
    await router.push('/')
  }
  pageLoading.changeLoadingStatus(false)
}

fetchData()
</script>

<style scoped lang="scss">
.booking-layout {
  background-color: var(--primary-color);
  padding: 3% 0;
  min-height: inherit;

  .white-section {
    background: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 48px;
    padding: 2.5em 6.875em;
    margin: 2.5em auto;
  }

  .btn-area {
    .btn {
      width: 196px;
      text-align: center;
      margin: 0 1em;

      &:active {
        background-color: var(--warning-color);
      }

      &:disabled {
        color: white;
        pointer-events: auto;
        background-color: var(--purple);
        border-color: var(--purple);
      }
    }
  }

  @media (max-width: 992px) {
    .white-section {
      padding: 2em;
      width: 90%;
    }
    .btn-area .btn {
      width: 90%;
      margin: 0 auto 24px auto;
    }
  }
}
</style>
