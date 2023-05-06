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
    <button type="button" class="btn btn-black" @click.prevent="submit">搜尋</button>
  </section>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'

const props = defineProps<{
  routeQueryKeyWord?: string
}>()

const emits = defineEmits({
  'emit-search-query': (searchQuery: SearchQuery) => true
})

const keyword = ref<string>(props.routeQueryKeyWord ?? '')

const priceItems = reactive([
  {
    value: [null, null],
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
    value: [2000, null],
    name: '2000以上'
  }
])
const price = ref<Array<number | null>>(priceItems[0].value)

const dateRangeItems = reactive([
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
const dateRange = ref<string>('month')

export interface SearchQuery {
  subject: string
  minPrice: number | null
  maxPrice: number | null
  eventStartDate: string
  eventEndDate: string
}

const submit = () => {
  let dateRangeFormat: string[] = []
  const today = dayjs()
  const todayFormat = today.format('YYYY/MM/DD')
  if (dateRange.value === 'today') {
    dateRangeFormat = [todayFormat, todayFormat]
  } else if (dateRange.value === 'week') {
    const nextWeek = today.add(7, 'day')
    dateRangeFormat = [todayFormat, nextWeek.format('YYYY/MM/DD')]
  } else if (dateRange.value === 'month') {
    const nextMonth = today.add(1, 'month')
    dateRangeFormat = [todayFormat, nextMonth.format('YYYY/MM/DD')]
  } else if (dateRange.value === 'twoMonth') {
    const nextMonth = today.add(2, 'month')
    dateRangeFormat = [todayFormat, nextMonth.format('YYYY/MM/DD')]
  }

  const searchQuery: SearchQuery = {
    subject: keyword.value,
    minPrice: price.value[0],
    maxPrice: price.value[1],
    eventStartDate: dateRangeFormat[0],
    eventEndDate: dateRangeFormat[1]
  }

  emits('emit-search-query', searchQuery)
}
</script>
<style scoped lang="scss">
.search-section {
  display: flex;
  column-gap: 1.5em;
  align-items: center;

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
  }

  @media (max-width: 1100px) {
    flex-wrap: wrap;
    row-gap: 8px;
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
