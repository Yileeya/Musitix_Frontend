<template>
  <div class="booking-layout" v-if="!pageLoading.loading">
    <steps-title class="container" v-model:current-step="currentStep" />
    <div class="container">
      <div class="white-section" v-show="currentStep === 1">
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
        v-show="currentStep === 2"
        class="white-section"
        ref="subscriberInformation"
        :props-pre-filled-info="preFilledInfo"
      />
    </div>
    <check-privacy-policy class="text-center" v-model="checkPrivacy" />
    <div class="text-center btn-area container">
      <button class="btn btn-purple" @click="reBack">取消</button>
      <button
        v-if="currentStep === 1"
        class="btn btn-purple"
        @click="nextStepToFilledSubscriberInformation"
      >
        下一步
      </button>
      <button v-else class="btn btn-purple" @click="submitForm" :disabled="!checkPrivacy">
        確認
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import StepsTitle from '@/views/booking/StepsTitle.vue'
import ActivityInfoTitle from '@/views/booking/ActivityInfoTitle.vue'
import ScheduleTicket from '@/views/booking/ScheduleTicket.vue'
import SubscriberInformation from '@/views/booking/SubscriberInformation.vue'
import CheckPrivacyPolicy from '@/views/booking/CheckPrivacyPolicy.vue'
import { getActivitySchedule, postBooking, getNewebPayInfo } from '@/apis/activities/activities'
import { getPreFilledInfo } from '@/apis/users/preFilledInfo'
import type { ActivitySchedule } from '@/types/activity/activitySchedule'
import type { PreFilledInfo } from '@/apis/users/preFilledInfo'
import { pageLoadingStore } from '@/stores/pageLoading'
import { bookingTicketStore } from '@/stores/bookingTicket'
import { appendNewbPaySubmitForm } from '@/utils/appendNewbPaySubmitForm'

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
const subscriberInformation = ref(null)
const currentStep = ref(1)

const route = useRoute()
const router = useRouter()
const routeParamsId = route.params.id.toString()

//設定資料
const checkPrivacy = ref<boolean>(false)
const activitySchedule = ref<ActivitySchedule>({} as ActivitySchedule)
const preFilledInfo = ref<PreFilledInfo>({} as PreFilledInfo)

// 取消，回上一頁
const reBack = () => {
  router.go(-1)
}

// 失敗，路由跳轉
const Toast = useToast()
const handleFetchError = (errorMsg: string, routerTo: string) => {
  Toast.error(errorMsg)
  router.push(routerTo)
}

const bookingTicket = bookingTicketStore()

// 下一步：填寫資料
const nextStepToFilledSubscriberInformation = async () => {
  const scheduleTicketValidateResult = await (scheduleTicket.value as any)?.validate()
  if (!scheduleTicketValidateResult) return
  const bookingTicketResult = bookingTicket.ticketList
  if (!bookingTicketResult.length) {
    //無選擇票數
    Toast.warning('請選擇票數！')
    return
  }
  currentStep.value = 2
}

// 確認訂票
const submitForm = async () => {
  const subscriberInformationValidateResult = await (subscriberInformation.value as any)?.validate()
  if (!subscriberInformationValidateResult) return

  const bookingForm = bookingTicket.getBookingForm
  let errorMsg = '訂票失敗，跳轉回活動頁。'
  const activityId = activitySchedule.value.activityId
  pageLoading.changeLoadingStatus(true)
  pageLoading.changeLoadingContent('訂單成立中請稍後...')
  try {
    let res = await postBooking(activityId, bookingForm)
    if (res.status === 200) {
      // 藍新金流付款
      const newebPayInfo = await getNewebPayInfo(res.data.data.orderId)
      await appendNewbPaySubmitForm(newebPayInfo.data.data)
    } else {
      handleFetchError(errorMsg, `/activity/${activityId}`)
    }
  } catch (err: any) {
    errorMsg = err.response.data.message
    handleFetchError(errorMsg, `/activity/${activityId}`)
  }
  pageLoading.changeLoadingStatus(false)
}

async function fetchData() {
  try {
    const [activityScheduleResult, preFilledInfoResult] = await Promise.all([
      getActivitySchedule(routeParamsId),
      getPreFilledInfo()
    ])
    if (activityScheduleResult.status === 200) {
      activitySchedule.value = activityScheduleResult.data.data
    }
    if (preFilledInfoResult.status === 200) {
      preFilledInfo.value = preFilledInfoResult.data.data
    }
  } catch (err: any) {
    const errorMsg = '獲取錯誤，跳轉回首頁。'
    handleFetchError(errorMsg, '/')
  }
  pageLoading.changeLoadingStatus(false)
}

fetchData()
</script>

<style scoped lang="scss">
.booking-layout {
  background-color: #141c75;
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
