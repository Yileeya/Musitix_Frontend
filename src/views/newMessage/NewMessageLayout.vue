<template>
  <section class="new-message-section">
    <div class="container container-body">
      <section class="news-message" v-if="!Route.query.id">
        <div class="area-title">
          <h2>最新消息</h2>
          <!--      <button type="button" class="btn btn-black">More　+</button>-->
        </div>
        <section class="news-message-area" v-if="newsObj.news">
          <div v-for="item in newsObj.news" :key="'news' + item.id" class="news-content" @click="GetMessage(item.id)">
            <div class="tag">
              訊息
            </div>
            <div class="news">
              {{ item.title }}
            </div>
          </div>
        </section>
        <!--    <button type="button" class="btn phone-btn">More　+</button>-->

      </section>
      <section class="new-message" v-if="currentMessage">
        <h2>{{ currentMessage.title }}</h2>
        <p class="message-time">{{ dateFormatUTC(currentMessage.date, 'YYYY/MM/DD (dd) hh:mm') }}</p>
        <p>{{ currentMessage.content }}</p>
      </section>
    </div>
    <img src="@/assets/img/home_news_bg.png" class="bg-img" alt="new-bg" />
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import newsMessage from '@/demoData/home/newsMessage'
import router from '@/router'
import { dateFormatUTC } from '@/utils/dateFormat'
import { getNews } from '@/apis/news/news'

const Router = useRouter()
const Route = useRoute()
interface NewsMessage {
  id: string,
  title: string,
  date: string,
  content: string
}
const newsObj: { news: NewsMessage[] } = reactive({ news: [] })
const currentMessage = ref<NewsMessage | null>(null)
GetMessages()

function GetMessages() {
  getNews().then(result => {
    newsObj.news = result.data.data
    if (Route.query.id) {
      GetMessage(Route.query.id.toString())
    }
  })
}
function GetMessage(id: string) {
  Router.push({ query: { id: id } })
  ShowMessage(id)
}
function ShowMessage(id: string) {
  currentMessage.value = newsObj.news.find(x => x.id == id) ?? null
}

watch(() => Route.query, () => {
  if (!Route.query.id) {
    currentMessage.value = null
  } else {
    ShowMessage(Route.query.id.toString())
  }
}, { immediate: true })

</script>
<style scoped lang="scss">
.new-message-section {
  min-height: inherit;
  position: relative;

  .bg-img {
    max-width: 100%;
    position: absolute;
    bottom: -5em;
    right: -6em;
    z-index: -1;

    @media (max-width: 1350px) {
      right: 0;
    }
  }
}

.title {
  color: var(--primary-color);
  margin-bottom: 32px;
  font-weight: bold;

  @media (max-width: 992px) {
    text-align: center;
  }
}

.bg {
  min-height: inherit;
  background-image: url('../../assets/img/bg_lg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 40%;
}

.container-body {
  padding: 46px 46px;


}

.news-message {
  position: relative;

  .phone-btn {
    display: none;
  }



  .area-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: var(--primary-color);
      font-weight: bold;
      @media (max-width: 992px) {
      text-align: center;
    }
    }

    .btn-black {
      padding: 8px 4em;
    }
  }

  .news-message-area {
    .news-content {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid;
      margin: 2em 0;

      .tag {
        background-color: black;
        color: white;
        padding: 0.25em 1.7em;
      }

      .news {
        margin: 0 1em;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  @media (max-width: 768px) {
    margin: 2em auto;

    .phone-btn {
      display: block;
      width: 100%;
      border: 1px solid;
      margin: 2em 0;

      &:hover {
        color: var(--primary-color);
      }
    }

    .area-title {
      justify-content: center;

      .btn-black {
        display: none;
      }
    }

    .news-message-area {
      .news-content {
        align-items: stretch;
        flex-direction: column;
        margin: 1.5em 0;

        .tag {
          text-align: center;
          margin-bottom: 1em;
        }
      }
    }

    .bg-img {
      width: 60%;
      position: absolute;
      right: 20%;
    }
  }



}

.new-message {
  padding: 32px 16px;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 48px;
  .message-time {
    color: var(--secondary-color);
  }

  h2 {
    color: var(--primary-color);
    font-weight: bold;
    @media (max-width: 992px) {
      text-align: center;
    }
  }
}
</style >
