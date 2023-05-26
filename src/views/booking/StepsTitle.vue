<template>
  <section class="steps-title">
    <template v-for="(step, index) in stepTitles">
      <div class="step" :class="[`step-${index + 1}`]">
        <span class="index">{{ index + 1 }}</span>
        <span>{{ step }}</span>
      </div>
      <div class="arrow" v-if="index + 1 < stepTitles.length"></div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stepTitles = ref(['確認訂票', '訂票結果'])
</script>

<style scoped lang="scss">
.steps-title {
  display: flex;
  justify-content: center;
  gap: 1.5em;
  .step {
    padding: 4px 2.5em;
    font-size: 20px;
    .index::after {
      content: '.';
      margin-right: 5px;
    }
  }
  .step-1 {
    color: white;
    border-bottom: 2px solid;
  }
  .step-2 {
    color: var(--warning-color);
  }
  .arrow {
    display: flex;
    align-items: center;
    &::before {
      content: '';
      display: block;
      width: 180px;
      height: 3px;
      background-color: var(--warning-color);
      margin-right: -8px;
      margin-top: 2px;
    }
    &::after {
      content: '\f105';
      font-family: 'FontAwesome';
      color: var(--warning-color);
      font-size: 30px;
    }
  }
  @media (max-width: 992px) {
    .step-2,
    .arrow {
      display: none;
    }
  }
}
</style>
