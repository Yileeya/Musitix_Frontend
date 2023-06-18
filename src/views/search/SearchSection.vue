<template>
  <section class="search-section">
    <input v-model="keyword" class="form-control keyword" placeholder="請輸入搜尋關鍵字" />
    <select v-model="price" class="form-select">
      <option v-for="priceItem in priceItems" :key="priceItem.name" :value="priceItem.value">
        {{ priceItem.name }}
      </option>
    </select>
    <select v-model="dateRange" class="form-select">
      <option
        v-for="dateRangeItem in dateRangeItems"
        :key="dateRangeItem.value"
        :value="dateRangeItem.value"
      >
        {{ dateRangeItem.name }}
      </option>
    </select>
    <button type="button" class="btn btn-black" @click.prevent="submit" :disabled="isLoading">
      搜尋
    </button>
  </section>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
import type { SearchActivityQuery } from '@/types/activity/searchActivityQuery'

const props = defineProps<{
  routeQueryKeyWord?: string
  isLoading: boolean
}>()

const emits = defineEmits({
  'emit-search-query': (searchQuery: SearchActivityQuery) => true
})

// 關鍵字搜尋
const keyword = ref<string>(props.routeQueryKeyWord ?? '')

// 價位選單
const priceItems = reactive([
  {
    value: ['', ''],
    name: '不限價位'
  },
  {
    value: [0, 500],
    name: '500以下'
  },
  {
    value: [500, 1000],
    name: '500 - 1000'
  },
  {
    value: [1000, 2000],
    name: '1000 - 2000'
  },
  {
    value: [2000, ''],
    name: '2000以上'
  }
])
const price = ref<Array<number | string>>(priceItems[0].value)

// 日期區間選擇
const dateRangeItems = reactive([
  {
    value: 'any',
    name: '不限時間'
  },
  {
    value: 'today',
    name: '今天'
  },
  {
    value: 'week',
    name: '一週內'
  },
  {
    value: 'month',
    name: '一個月內'
  },
  {
    value: 'twoMonth',
    name: '二個月內'
  }
])
const dateRange = ref<string>('any')

// 點擊搜尋
const submit = () => {
  let dateRangeToISOString: string[] = []
  const today = dayjs()

  if (dateRange.value === 'any') {
    dateRangeToISOString = ['', '']
  } else if (dateRange.value === 'today') {
    dateRangeToISOString = [today.toISOString(), today.toISOString()]
  } else if (dateRange.value === 'week') {
    const nextWeek = today.add(7, 'day')
    dateRangeToISOString = [today.toISOString(), nextWeek.toISOString()]
  } else if (dateRange.value === 'month') {
    const nextMonth = today.add(1, 'month')
    dateRangeToISOString = [today.toISOString(), nextMonth.toISOString()]
  } else if (dateRange.value === 'twoMonth') {
    const nextMonth = today.add(2, 'month')
    dateRangeToISOString = [today.toISOString(), nextMonth.toISOString()]
  }

  const searchQuery: SearchActivityQuery = {
    subject: keyword.value,
    minPrice: price.value[0],
    maxPrice: price.value[1],
    startDate: dateRangeToISOString[0],
    endDate: dateRangeToISOString[1]
  }

  emits('emit-search-query', searchQuery)
}

//預先載入活動
submit()
</script>
<style scoped lang="scss">
.search-section {
  display: flex;
  column-gap: 1.5em;
  align-items: stretch;

  .form-control,
  .form-select {
    border: 2px solid var(--gray);
    border-radius: 4px;
    line-height: 2em;

    &:focus {
      border: 2px solid var(--primary-color);
    }

    &.keyword {
      flex: 1;
    }

    &.form-select {
      width: 250px;
    }
  }

  .btn-black {
    width: 5em;
    margin-left: 1em;
    &:disabled {
      pointer-events: auto;
      background-color: transparent;
    }
  }

  @media (max-width: 1100px) {
    flex-wrap: wrap;
    gap: 8px;
    .keyword {
      flex: 1 1 100% !important;
    }
  }
  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 15px 15px 30px !important;
    .form-control,
    .form-select {
      width: 100% !important;
    }
    .btn-black {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>
