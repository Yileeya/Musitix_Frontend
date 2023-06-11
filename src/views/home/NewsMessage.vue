<template>
  <section class="news-message">
    <div class="area-title">
      <h2>最新消息</h2>
      <!--      <button type="button" class="btn btn-black">More　+</button>-->
    </div>
    <section class="news-message-area" v-if="newsObj.news.length > 0">
      <div v-for="item in newsObj.news" :key="'news' + item.id" class="news-content" @click="MessageDetail(item.id)">
        <div class="tag">
          訊息
        </div>
        <div class="news">
          {{ item.title }}
        </div>
      </div>
    </section>
<!--    <button type="button" class="btn phone-btn">More　+</button>-->
    <img src="@/assets/img/home_news_bg.png" class="bg-img" alt="new-bg" />
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import newsMessage from '@/demoData/home/newsMessage'
import { useRouter } from 'vue-router'
import { getNews } from '@/apis/news/news'
const Router = useRouter()
interface NewsMessage {
  id: string,
  title: string,
  date: string,
  content: string
}

const newsObj: {news:NewsMessage[]} = reactive({news:[]})
GetMessages()
function GetMessages(){
  getNews().then(result=>{   
    newsObj.news = result.data.data  
    if(newsObj.news.length > 2) {
      newsObj.news.length = 2
    }
  
  }) 
}
function MessageDetail(id:string){
  Router.push({ path:"/news",query: { id: id}})
}
</script>

<style scoped lang="scss">
.news-message {
  margin: 5em auto;
  position: relative;

  .phone-btn {
    display: none;
  }

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

  .area-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      color: var(--primary-color);
      font-weight: bold;
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
</style>
