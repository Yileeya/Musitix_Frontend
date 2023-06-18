<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand">
        <RouterLink to="/">
          <musitix-icon-svg />
        </RouterLink>
      </a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li v-for="navItem in showNavItems" :key="navItem.link" class="nav-item">
            <RouterLink :to="navItem.link">{{ navItem.name }}</RouterLink>
          </li>
        </ul>
        <div class="user-control-area d-flex">
          <div class="user" v-if="userProfile.IsLogin && userProfile.UserProfiles != null">
            <template
              v-if="userProfile.UserProfiles != null && userProfile.UserProfiles?.picture != ''"
            >
              <img :src="userProfile.UserProfiles?.picture" class="user-img" alt="user-img" />
            </template>
            <template v-else>
              <circle-user-svg />
            </template>
            <span class="name"> {{ userProfile.UserProfiles?.username }} </span>
          </div>
          <button class="btn login-btn btn-black" type="button" @click.prevent="LoginRoute">
            {{ userProfile.IsLogin ? '登出' : '登入' }}
          </button>
        </div>
      </div>
      <div class="navbar-collapse-show">
        <div class="nav-icon" v-for="navItem in showIconNavItems" :key="'icon' + navItem.link">
          <RouterLink :to="navItem.link">
            <component class="nav-icon" :is="navItem.icon" />
          </RouterLink>
        </div>
        <div class="nav-icon" @click.prevent="LoginRoute">
          <circle-user-svg
            v-if="
              !userProfile.IsLogin || !userProfile.UserProfiles || !userProfile.UserProfiles.picture
            "
          />
          <img v-else :src="userProfile.UserProfiles?.picture" class="user-img" alt="user-img" />
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, computed, markRaw } from 'vue'
import { useUserProfileStore } from '@/stores/user'
import MusitixIconSvg from '@/components/icons/MusitixIconSvg.vue'
import CircleUserSvg from '@/components/icons/CircleUserSvg.vue'
import HomeSvg from '@/components/icons/HomeSvg.vue'
import SearchSvg from '@/components/icons/SearchSvg.vue'
import NewsSvg from '@/components/icons/NewsSvg.vue'
import PeopleSvg from '@/components/icons/PeopleSvg.vue'

const navItems = ref([
  {
    name: '活動搜尋',
    link: '/search'
  },
  {
    name: '最新消息',
    link: '/news'
  },
  {
    name: '會員專區',
    link: '/member'
  }
])
const iconNavItems = ref([
  {
    name: 'home',
    icon: markRaw(HomeSvg),
    link: '/'
  },
  {
    name: 'search',
    icon: markRaw(SearchSvg),
    link: '/search'
  },
  {
    name: 'news',
    icon: markRaw(NewsSvg),
    link: '/news'
  },
  {
    name: 'people',
    icon: markRaw(PeopleSvg),
    link: '/member'
  }
])

const userProfile = useUserProfileStore()
const router = useRouter()
const showNavItems = computed(() => {
  return navItems.value.filter((item) => (userProfile.IsLogin ? item : item.link !== '/member'))
})
const showIconNavItems = computed(() => {
  return iconNavItems.value.filter((item) => (userProfile.IsLogin ? item : item.name !== 'people'))
})

function LoginRoute() {
  if (userProfile.IsLogin) {
    //Logout()
    localStorage.removeItem('Token')
    userProfile.SetIsLogin(false)
    if (router.currentRoute.value.meta.requiresAuth) {
      router.push('/')
    }
  } else {
    router.push('/Login')
  }
}
</script>
<style scoped lang="scss">
.navbar {
  background-color: white !important;

  .container-fluid {
    max-width: 1300px;

    .navbar-brand svg {
      color: black;
    }

    .nav-item a {
      color: black;
      font-size: 20px;
      line-height: 32px;
      text-decoration: none;
      margin: 0 1em;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        width: 0;
        height: 2px;
        background-color: var(--primary-color);
        transition: all 0.3s ease-out;
      }

      &:hover,
      &.router-link-active {
        color: var(--primary-color);

        &::after {
          left: 0;
          width: 100%;
        }
      }
    }

    .user-control-area {
      align-items: center;

      .user {
        display: flex;
        align-items: center;

        .user-img {
          border-radius: 50%;
          overflow: hidden;
          height: 38px;
          width: 38px;
        }

        .name {
          margin: 0 2em 0 1em;
          max-width: 10em;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          display: -webkit-box;

          &:hover {
            cursor: default;
          }
        }

        .login-btn {
          font-size: 16px;
          width: 80px;
          padding: 8px 12px;
        }
      }
    }

    .navbar-collapse-show {
      display: none;
    }

    .user-img {
      border-radius: 50%;
      overflow: hidden;
      height: 38px;
      width: 38px;
    }
  }

  @media (max-width: 992px) {
    padding: 0.5em 0;
    .navbar-brand {
      padding: 0;
      margin: auto;
      text-align: center;

      svg {
        max-width: 50%;
      }
    }
    .navbar-collapse-show {
      .nav-icon {
        color: black;
      }

      .router-link-active .nav-icon {
        color: #141c75;
      }
    }
  }
}
</style>
