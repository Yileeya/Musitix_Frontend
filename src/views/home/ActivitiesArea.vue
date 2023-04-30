<template>
  <section class="activities-area">
    <div class="container">
      <div class="title-area">
        <h2 :style="{ color: titleColor }">{{ title }}</h2>
        <button type="button" class="btn" :class="[buttonClass]">More　+</button>
      </div>
      <div class="activities">
        <activity-card
          class="activity-card"
          v-for="activity in activities"
          :key="activity.id"
          :activity-items="activity"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ActivityCard from '@/components/ActivityCard.vue'
import type { Activity } from '@/components/ActivityCard.vue'

defineProps<{
  title: string
  titleColor: string
  buttonClass: string
  activities: Array<Activity>
}>()
</script>

<style scoped lang="scss">
.activities-area {
  padding: 4em 0;

  .title-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75em;

    h2 {
      font-weight: bold;
    }

    .btn {
      padding: 8px 4em;
    }
  }
  .activities {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .activity-card {
      min-width: 420px;
      width: 30%;
      margin: 1em 0;
    }
  }
  @media (max-width: 1260px) {
    .activity-card {
      min-width: auto !important;
      width: 100% !important;
    }
  }
}
</style>
