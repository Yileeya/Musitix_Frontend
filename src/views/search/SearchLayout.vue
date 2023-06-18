<template>
  <div class="search-layout">
    <search-section
      class="container"
      :route-query-key-word="route.query.subject as string | undefined ?? ''"
      :is-loading="loading"
      @emit-search-query="fetchSearch"
    />
    <div class="text-center" v-if="!searchActivitiesResult.length && !loading">
      無活動符合搜尋條件
    </div>
    <section>
      <loading-spinner class="loading-spinner" v-if="loading" />
      <div class="activities container" v-else>
        <activity-card
          class="activity-card"
          v-for="activity in searchActivitiesResult"
          :key="activity.id"
          :activity-items="activity"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SearchSection from '@/views/search/SearchSection.vue'
import ActivityCard from '@/components/ActivityCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import _ from 'lodash'
import type { Activity } from '@/types/activity/activity'
import type { SearchActivityQuery } from '@/types/activity/searchActivityQuery'
import { getSearchActivities } from '@/apis/activities/activities'
import { useToast } from 'vue-toastification'

const Toast = useToast()

const searchActivitiesResult = ref<Activity[]>([])
const loading = ref<boolean>(true)

const route = useRoute()
const router = useRouter()
if (!_.isEmpty(route.query)) {
  router.replace({
    path: '/search'
  })
}

const fetchSearch = async (query: SearchActivityQuery) => {
  loading.value = true
  try {
    let res = await getSearchActivities(query)
    if (res.status === 200) {
      searchActivitiesResult.value = res.data.data.map((activity: Activity) =>
        _.pick(activity, [
          'id',
          'title',
          'mainImageUrl',
          'minPrice',
          'maxPrice',
          'startDate',
          'endDate'
        ])
      )
    }
  } catch (error: any) {
    Toast.error(error.response.data.message)
    searchActivitiesResult.value = []
  }
  loading.value = false
}
</script>

<style scoped lang="scss">
.search-layout {
  position: relative;
  .container {
    max-width: 1300px;
  }
  &::before {
    content: '';
    position: absolute;
    top: calc(-100% + 200px);
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url(/src/assets/img/home_news_bg.png);
    transform: scaleY(-1) scaleX(-1);
    z-index: -1;
    @media (max-width: 992px) {
      background-image: none;
    }
  }
  .search-section {
    padding: 3em 12px;
  }

  .activities {
    display: grid;
    gap: 1.5em;
    grid-template-columns: repeat(3, 1fr);
    padding-bottom: 3em;

    .activity-card {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      :deep .card-img-body {
        border-radius: 6px 6px 0 0;
      }
    }

    @media (max-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .loading-spinner {
    margin: 20px;
  }
}
</style>
