<template>
  <div class="bg">
  <div class="container member-container">
    <div class="row">
      <div class="col-12 col-lg-auto">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink to="/">
                首頁
              </RouterLink>
            </li>
            <li class="breadcrumb-item">
              <RouterLink to="/member/account">
                會員中心
              </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ pathName }}</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-3 d-none d-lg-block">
          <div class="side-bar">
            <ol>
              <li v-for="member in  memberSide" class="member-pagelink-item"
                :class="member.name == pathName ? 'active' : ''">
                <RouterLink :to="member.link">
                  <component :is="member.icon" class="item-icon" />
                  {{ member.name }}
                </RouterLink>
              </li>
            </ol>
          </div>
        </div>
        <div class="col-lg-9 col-12">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
import { ref, watch, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import AccountIcon from '../../components/icons/MemberAccount.vue'
import PersonInfoIcon from '../../components/icons/MemberPersonInfo.vue'
import TicketIcon from '../../components/icons/MemberTicket.vue'

const Route = useRoute()

const memberSide = ref([
  {
    name: '帳號管理',
    icon: markRaw(AccountIcon),
    link: '/member/account'
  },
  {
    name: '我的票卷',
    icon: markRaw(TicketIcon),
    link: '/member/ticket'
  },
  {
    name: '預填資料設定',
    icon: markRaw(PersonInfoIcon),
    link: '/member/setPersonInfo'
  },
  {
    name: '密碼修改',
    icon: markRaw(AccountIcon),
    link: '/member/password'
  }
])
const pathName = ref(memberSide.value.find(x => Route.path.includes(x.link))?.name)
watch(() => Route.path, () => {
  pathName.value = memberSide.value.find(x => Route.path.includes(x.link))?.name
}, { immediate: true })
</script>
<style scoped lang="scss">
.bg{
  min-height: inherit;
  background-image: url('../../assets/img/bg_lg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y:40% ;
}
.member-container {
  padding-top: 40px;
  
}

.breadcrumb {
  a {
    color: var(--primary-color);
    text-decoration: none;
    position: relative;

    &:hover {
      color: var(--secondary-color);
    }
  }

  .breadcrumb-item .active {
    color: var(--secondary-color);
  }
}

.side-bar {
  padding: 32px 16px;
  background: #FFFFFF;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 48px;

  ol {
    padding: 0;
  }

  .member-pagelink-item {
    display: flex;
    padding: 8px 12px 8px 52px;
    align-items: center;
    margin-bottom: 16px;
    position: relative;

    &:last-child {
      margin-bottom: 0;
    }

    &:not(:last-child):after {
      content: "";
      position: absolute;
      border-top: 1px solid var(--gray);
      bottom: -16px;
      height: 8px;
      left: 0;
      width: 100%;
    }

    .item-icon {
      position: absolute;
      left: 12px;
      top: 8px;
      width: 40px;
      height: 28px;
      padding-right: 12px;
    }


    a {
      text-decoration: none;
      color: black;
      text-align: center;
      width: 100%;

      &:hover {
        color: var(--primary-color);

      }
    }

    &.active {
      .item-icon {
        color: var(--primary-color);
      }

      a {
        color: var(--primary-color);
        font-weight: 700;
      }

    }
  }
}

@media (max-width: 992px) {
  .breadcrumb {
    background: #FFFFFF;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 48px;
    display: flex;
    justify-content: center;
    padding: 16px;
  }
}</style >
