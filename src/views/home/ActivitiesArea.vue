<template>
  <section class="activities-area">
    <div class="container">
      <div class="title-area">
        <h2 :style="{ color: titleColor }">{{ title }}</h2>
      </div>
      <div class="activities">
        <activity-card
          :is-hide-price="true"
          class="activity-card"
          v-for="activity in activities"
          :key="activity.id"
          :activity-items="activity"
        />
      </div>
      <button
        type="button"
        class="btn more-btn"
        :class="[buttonClass]"
        @click.prevent="emitRouterChange"
      >
        More　+
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import ActivityCard from '@/components/ActivityCard.vue'
import type { Activity } from '@/types/activity/activity'

defineProps<{
  title: string
  titleColor: string
  buttonClass: string
  activities: Array<Activity>
}>()

const emit = defineEmits<{
  (e: 'changeRouterPath', path: string): void
}>()

function emitRouterChange() {
  emit('changeRouterPath', '/search')
}
</script>

<style scoped lang="scss">
.activities-area {
  padding: 4em 0;

  .container {
    position: relative;
  }

  .more-btn {
    padding: 8px 4em;
    position: absolute;
    top: 0;
    right: 15px;
  }

  .title-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75em;

    h2 {
      font-weight: bold;
    }
  }

  .activities {
    display: grid;
    grid-row-gap: 2em;
    grid-column-gap: 1em;
    grid-template-columns: repeat(3, 1fr);
    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 992px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media (max-width: 992px) {
    padding: 2em 0;
    .more-btn {
      position: relative;
      width: 100%;
      margin-top: 1.5em;
      right: 0;
    }
    .title-area {
      justify-content: center;
      margin-bottom: 1em;
    }
  }
}
</style>
