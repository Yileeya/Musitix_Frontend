<template>
  <section class="search-bar">
    <div class="search-bg">
      <div class="form-input">
        <input
          v-model="search"
          class="form-control"
          placeholder="想聽哪個樂團？"
          @keydown.enter="emitRouterChange"
        />
        <i class="fa fa-search" @click.prevent="emitRouterChange" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const search = ref('')
const emit = defineEmits<{
  (e: 'changeRouterPath', path: string): void
}>()

function emitRouterChange() {
  if (!search.value) return
  emit('changeRouterPath', '/search')
}
</script>

<style scoped lang="scss">
.search-bar {
  position: relative;
  margin-top: -1em;

  .search-bg {
    background-color: #f9f9f9;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 48px;
    padding: 2.5em 0;

    .form-input {
      width: 80%;
      margin: auto;
      position: relative;

      .form-control {
        border: 2px solid var(--gray);
        border-radius: 4px;
        height: 3.5em;
        padding: 0 15px;

        &:focus {
          border-color: var(--primary-color);
        }

        &:focus + .fa-search {
          color: var(--primary-color);
        }
      }

      .fa-search {
        position: absolute;
        top: 14px;
        right: 15px;
        color: var(--gray);
        font-size: 30px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
