<template>
  <div class="banner">
    <img :src="mainImageUrl" alt="banner" />
  </div>
  <section class="info-section">
    <div class="container">
      <h2>{{ title }}</h2>
      <div class="title-content" v-for="infoTitle in Object.keys(infoTitleItems)" :key="infoTitle">
        <component class="icon" :is="infoTitleItems[infoTitle].icon" />
        <h5>{{ infoTitleItems[infoTitle].name }}</h5>
      </div>
      <button type="button" class="btn-purple btn" @click.prevent="scrollToByTickets">
        <span>立即購票</span>
        <member-ticket class="icon" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, markRaw, computed } from 'vue'
import { dateFormatUTC } from '@/utils/dateFormat'
import CalendarSvg from '@/components/icons/CalendarSvg.vue'
import MusitixIconSmSvg from '@/components/icons/MusitixIconSmSvg.vue'
import MemberTicket from '@/components/icons/MemberTicket.vue'
import MapLocationSvg from '@/components/icons/MapLocationSvg.vue'

const props = defineProps<{
  mainImageUrl: string
  title: string
  dateRange: Array<string>
  sponsorName: string
  location: string
  address: string
}>()

interface InfoTitleItem {
  name: string
  icon: any
}

const infoTitleItems: Record<string, InfoTitleItem> = ref({
  date: {
    name: computed(() => {
      const format = [
        dateFormatUTC(props.dateRange[0], 'YYYY/MM/DD (dd)'),
        dateFormatUTC(props.dateRange[1], 'YYYY/MM/DD (dd)')
      ]
      return format.join(' — ')
    }),
    icon: markRaw(CalendarSvg)
  },
  location: {
    name: computed(() => {
      return props.address + (props.location ? ` (${props.location})` : '')
    }),
    icon: markRaw(MapLocationSvg)
  },
  sponsor: {
    name: props.sponsorName,
    icon: markRaw(MusitixIconSmSvg)
  }
}).value

const scrollToByTickets = () => {
  const element = document.getElementById('ByTickets')
  if (element) {
    const targetScrollTop = element.offsetTop - 50
    window.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
  }
}
</script>

<style scoped lang="scss">
.banner {
  max-height: 600px;
  overflow-y: hidden;
  display: flex;
  align-items: center;

  img {
    width: 100%;
  }

  @media (max-width: 992px) {
    max-height: 45vh;
  }
}

.info-section {
  background: var(--primary-color);
  padding: 3.5em 0;
  color: white;

  .container {
    position: relative;

    h2 {
      font-weight: bold;
      margin-bottom: 1em;
    }

    .title-content {
      display: flex;
      align-items: center;
      margin-top: 1em;

      .icon {
        margin-right: 1em;
      }

      h5 {
        margin: 0;
      }
    }
  }
}

.btn-purple {
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  width: 200px;
  align-items: center;
  justify-content: center;

  .icon {
    margin: 1px 0.5em 0;
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    margin: 2em 0 -1em;
  }
}
</style>
