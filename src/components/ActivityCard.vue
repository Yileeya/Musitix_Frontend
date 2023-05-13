<template>
  <div class="card">
    <div class="card-img-body" @click.prevent="changeRouterPath">
      <img :src="activityItems.imgHref" :alt="activityItems.title" />
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
          {{ activityItems.date }}
        </div>
        <div class="card-text price">
          {{ activityItems.price }}
        </div>
      </div>
      <button class="btn btn-black-border" @click.prevent="changeRouterPath">前往購票</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

export interface Activity {
  id?: number
  imgHref: string
  title: string
  content: string
  date: string
  activityHref: string
  price?: string

  [key: string]: any
}

const props = defineProps<{
  activityItems: Activity
}>()

const router = useRouter()
const changeRouterPath = () => {
  router.push(`/activity/${props.activityItems.id}`)
}
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
      padding: 0.5em 2.5em;

      &:hover {
        color: var(--primary-color);
        border-color: var(--primary-color);
      }
    }
  }
}
</style>
