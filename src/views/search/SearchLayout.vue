<template>
  <div class="search-layout">
    <search-section
      class="container"
      @emit-search-query="fetchSearchQuery"
      :route-query-key-word="route.query.subject as string | undefined ?? ''"
    />
    <div class="activities container">
      <activity-card
        class="activity-card"
        v-for="activity in activitiesDemo"
        :key="activity._id"
        :activity-items="activity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchSection from '@/views/search/SearchSection.vue'
import { useRoute, useRouter } from 'vue-router'
import ActivityCard from '@/components/ActivityCard.vue'
import type { Activity } from '@/types/activity/activity'
import { ref } from 'vue'
import _ from 'lodash'

const activitiesDemo = ref<Activity[]>([])

const route = useRoute()
const router = useRouter()
if (!_.isEmpty(route.query)) {
  router.replace({
    path: '/search'
  })
}

const fetchSearchQuery = (query: any) => {
  router.replace({
    path: '/search',
    query: query
  })
}
</script>

<style scoped lang="scss">
.search-layout {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: calc(100% - 270px);
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url(/src/assets/img/home_news_bg.png);
    transform: scaleY(-1) scaleX(-1);
    z-index: -1;
  }

  .search-section {
    padding: 3em 0;
  }

  .activities {
    max-width: 1700px;
    display: grid;
    grid-row-gap: 2em;
    grid-column-gap: 1em;
    grid-template-columns: repeat(3, 1fr);
    padding: 0 5% 5%;

    .activity-card {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
