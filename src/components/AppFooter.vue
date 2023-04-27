<template>
  <div class="footer">
    <div class="footer-content row">
      <div class="col-md-6 icon-col">
        <musitix-icon-svg />
        <div class="copy-right">{{ copyRight }}</div>
      </div>
      <div class="col-md-6 footer-items">
        <section v-for="footerItem in footerItems" :key="footerItem.name">
          <h5>{{ footerItem.title }}</h5>
          <p v-for="content in footerItem.items" :key="content.title">
            <template v-if="footerItem.name === 'follow'">
              <a :href="content.link" target="_blank">
                <component :is="content.icon" />
                {{ content.title }}
              </a>
            </template>
            <template v-else>
              <RouterLink :to="content.link">
                {{ content.title }}
              </RouterLink>
            </template>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MusitixIconSvg from '@/components/icons/MusitixIconSvg.vue'
import Facebook from '@/components/icons/Facebook.vue'
import Instagram from '@/components/icons/Instagram.vue'
import { ref, markRaw } from 'vue'
const copyRight = ref('Copyright © 2023 consulation ｜ All Rights Reserved')
const footerItems = ref([
  {
    title: '會員中心',
    name: 'memberCentre',
    items: [
      {
        title: '個人資料',
        link: '/'
      },
      {
        title: '訂票紀錄',
        link: '/'
      },
      {
        title: '加入會員',
        link: '/'
      },
      {
        title: '最新活動',
        link: '/'
      }
    ]
  },
  {
    title: '常見問題',
    name: 'commonProblems',
    items: [
      {
        title: '註冊認證',
        link: '/'
      },
      {
        title: '付款相關',
        link: '/'
      },
      {
        title: '退票相關',
        link: '/'
      }
    ]
  },
  {
    title: '追蹤我們',
    name: 'follow',
    items: [
      {
        title: 'Facebook',
        icon: markRaw(Facebook),
        link: 'https://www.facebook.com'
      },
      {
        title: 'Instagram',
        icon: markRaw(Instagram),
        link: 'https://www.instagram.com'
      }
    ]
  }
])
</script>
<style scoped lang="scss">
$secondary: #6c757d;
.footer {
  background-color: white;
  padding: 1em;
  .footer-content {
    max-width: 1300px;
    margin: auto;
  }

  .icon-col {
    margin: auto;

    .copy-right {
      color: $secondary;
      margin-top: 1.5em;
    }
  }

  .footer-items {
    display: flex;
    justify-content: space-between;

    h5 {
      color: $secondary;
      font-size: 20px;
      margin: 0.8em 0;
    }

    a {
      color: black;
      text-decoration: none;
      padding-left: 0.5em;

      svg {
        margin-right: 0.5em;
      }
    }
  }
  @media (max-width: 992px) {
    padding: 0 1em;
    .footer-content {
      flex-direction: column-reverse;
      .icon-col {
        text-align: center;
        padding: 2em 0 1em;
      }
      .footer-items {
        flex-direction: column;
      }
    }
  }
}
</style>
