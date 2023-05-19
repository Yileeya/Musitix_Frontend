<template>
  <div class="card" :class="[{ 'image-error': imageError }]">
    <div class="card-img-body" @click.prevent="changeRouterPath">
      <img
        :src="activityItems.mainImageUrl"
        :alt="activityItems.title"
        @error="imageError = true"
      />
      <div class="card-img-overlay">
        <h4 class="card-title">
          {{ activityItems.title }}
        </h4>
        <p class="card-text">
          {{ activityItems.content }}
        </p>
      </div>
    </div>
    <div class="card-body">
      <div>
        <div class="card-text date">
          {{ showDateFormatText }}
        </div>
        <div class="card-text price" v-if="!isHidePrice">
          {{ showPriceRange }}
        </div>
      </div>
      <button class="btn btn-black-border" @click.prevent="changeRouterPath">前往購票</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Activity } from '@/types/activity/activity'
import { dateFormatUTC } from '@/utils/dateFormat'
import { ref, computed } from 'vue'

const props = defineProps<{
  activityItems: Activity
  isHidePrice?: Boolean
}>()

const imageError = ref(false)

const router = useRouter()
const changeRouterPath = () => {
  router.push(`/activity/${props.activityItems._id}`)
}

const showDateFormatText = computed(() => {
  const activity = props.activityItems
  const startDateFormat = dateFormatUTC(activity.startDate, 'YYYY-MM-DD')
  const endDateFormat = dateFormatUTC(activity.endDate, 'YYYY-MM-DD')
  if (startDateFormat === endDateFormat) return startDateFormat
  else return startDateFormat + '  至  ' + endDateFormat
})

const showPriceRange = computed(() => {
  const activity = props.activityItems
  const minPrice = activity.minPrice
  const maxPrice = activity.maxPrice
  if (minPrice === maxPrice) return '$' + minPrice
  else return '$' + minPrice + '  -  ' + ('$' + maxPrice)
})
</script>

<style scoped lang="scss">
.card {
  transition: all 0.3s ease;
  padding: 0;
  border: none;

  .card-img-body {
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      max-height: 250px;
      object-position: center;
      object-fit: cover;
    }

    .card-img-overlay {
      transition: all 0.3s ease;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      z-index: 5;
      cursor: pointer;
      text-align: left;

      .card-text {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
        transition: all 0.3s ease;
        display: -webkit-box;
        opacity: 0;
        max-height: 0;
      }
    }

    &::after {
      content: '';
      z-index: 1;
      transition: opacity 0.5s ease;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      background-color: rgba(0, 0, 0, 0.7);
      opacity: 0;
    }

    &:hover {
      .card-img-overlay {
        transition: all 0.3s ease !important;

        .card-text {
          opacity: 1;
          max-height: 50%;
        }
      }

      &::after {
        opacity: 1;
        transition: opacity 0.5s ease !important;
      }
    }
  }

  .card-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .date,
    .price {
      color: #6c757d;

      &.price {
        margin-top: 5px;
      }
    }

    .btn-black-border {
      border: 1px solid;
      padding: 0.5em 2em;

      &:hover {
        color: var(--primary-color);
        border-color: var(--primary-color);
      }
    }
  }
}

.image-error {
  display: flex;
  justify-content: flex-end;

  .card-body {
    flex: 0 1 auto;
  }

  .card-img-body {
    flex: 1;
    background: darkgray;
    min-height: 250px;
  }
}
</style>
