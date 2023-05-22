<template>
  <div class="booking-layout">
    <steps-title class="container" />
    <div class="container white-section">
      <activity-info-title
        :title="scheduleDemo.title"
        :start-time="scheduleDemo.schedule.startTime"
        :end-time="scheduleDemo.schedule.endTime"
        :address="scheduleDemo.address"
        :location="scheduleDemo.location"
      />
      <schedule-ticket
        ref="scheduleTicket"
        :props-tickets="scheduleDemo.schedule.ticketCategories"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, toRef } from 'vue'
import scheduleDemo from '@/demoData/scheduleDemo'
import StepsTitle from '@/views/booking/StepsTitle.vue'
import ActivityInfoTitle from '@/views/booking/ActivityInfoTitle.vue'
import ScheduleTicket from '@/views/booking/ScheduleTicket.vue'

//設定子層項目，為能獲取子層function
defineComponent({
  components: { 'schedule-ticket': ScheduleTicket }
})
const scheduleTicket = ref(null)
const scheduleTicketInstance = toRef(scheduleTicket, 'value')
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

  @media (max-width: 992px) {
    .white-section {
      padding: 2em;
      width: 90%;
    }
  }
}
</style>
