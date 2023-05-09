<template>
  <section class="ticket-info">
    <div class="container">
      <h2>訂票資訊</h2>
      <div class="flex-table">
        <div class="flex-thead">
          <div class="flex-tr">
            <div class="flex-th width-250">場次</div>
            <div class="flex-th">售票時間</div>
            <div class="flex-th width-250"></div>
          </div>
        </div>
        <div class="flex-tbody" v-if="schedules.length">
          <div class="flex-tr" v-for="item in schedules" :key="item.date">
            <div class="flex-td width-250">
              <calendar-svg class="icon" />
              {{ dateFormatUTC(item.date, 'YYYY/MM/DD (dd)') }}
            </div>
            <div class="flex-td">
              <i class="fa fa-clock-o fa-lg icon"></i>
              <div class="date-range">
                <span>{{ dateFormatUTC(item.date, 'YYYY/MM/DD (dd) HH:mm') }}</span>
                <span class="separator"></span>
                <span>{{ dateFormatUTC(item.date, 'YYYY/MM/DD (dd) HH:mm') }}</span>
              </div>
            </div>
            <div class="flex-td width-250 btn-block">
              <button type="button" class="btn btn-black">購票</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { dateFormatUTC } from '@/utils/dateFormat'
import CalendarSvg from '@/components/icons/CalendarSvg.vue'
defineProps<{
  schedules: any
}>()
</script>

<style scoped lang="scss">
.ticket-info {
  background-image: url(/src/assets/img/bg_lg.png);
  background-size: cover;
  background-position: 100% 25%;
  min-height: 545px;
  display: flex;
  align-items: center;
  padding: 4em 0 5em;
  h2 {
    color: var(--primary-color);
    font-weight: bold;
    margin-bottom: 1em;
  }
  .flex-table {
    position: relative;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    background-color: white;
    border-radius: 3em;
    padding: 4em;
    .flex-thead {
      margin-bottom: 10px;
      position: sticky;
      top: 0;
      left: 0;
    }
    .flex-tr {
      display: flex;
      padding: 15px 30px;
      column-gap: 2em;
    }
    .flex-td,
    .flex-th {
      flex: 1;
      white-space: break-spaces;
      word-break: break-word;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .flex-th {
      position: relative;
      color: var(--primary-color);
      font-size: 1.5em;
      border: 2px solid;
      border-bottom: none;
      border-top: none;
      &:last-child {
        border: none;
      }
    }
    .flex-td {
      font-size: 20px;
      .icon {
        display: none;
      }
      .date-range {
        display: flex;
        align-items: center;
        .separator {
          width: 15px;
          border-top: 1px solid black;
          margin: 0 5px;
          display: inline-block;
        }
      }
    }
    .width-250 {
      max-width: 250px;
    }
    .btn-black {
      width: 200px;
      text-align: center;
    }
  }
  @media (max-width: 1440px) {
    .flex-tr {
      .width-250:last-child {
        max-width: 80px !important;
        .btn-black {
          width: 100% !important;
        }
      }
    }
  }
  @media (max-width: 992px) {
    background-image: none;
    h2 {
      text-align: center;
    }
    .icon {
      display: block !important;
    }
    .flex-table {
      padding: 15px;
      .flex-thead {
        display: none;
      }
      .flex-tbody .flex-tr {
        flex-direction: column;
        align-items: center;
        margin: 15px 0;
        padding: 0;
        .flex-td {
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          margin-bottom: 1.5em;
          .date-range {
            display: flex;
            flex-direction: column;
            align-items: center;
            .separator {
              height: 15px;
              width: auto;
              border-right: 1px solid black;
              margin: 5px 0;
            }
          }
          &.btn-block {
            max-width: initial !important;
            width: 85%;
            margin-top: -0.5em;
            .btn-black {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
