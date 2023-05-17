<template>
  <div class="loading-layout">
    <div class="loading-svg">
      <svg
        class="svg-animation"
        width="216"
        height="30"
        viewBox="0 0 216 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M213 3.5V26.5L193.5 3.5V18L0 18"
          stroke="url(#paint0_linear_1829_2483)"
          stroke-width="6"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1829_2483"
            x1="-1.32567e-06"
            y1="26.5"
            x2="117.908"
            y2="-36.2548"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#BD4BE7" stop-opacity="0" />
            <stop offset="1" stop-color="#BD4BE7" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        class="main-animate"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="48px"
        height="60px"
        viewBox="0 0 24 30"
        style="enable-background: new 0 0 50 50"
        xml:space="preserve"
      >
        <rect x="0" y="13" width="4" height="5" fill="#BD4BE7">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="15; 5; 15"
            begin="0s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="10" y="13" width="4" height="5" fill="#BD4BE7">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.3s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="15; 5; 15"
            begin="0.3s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="20" y="13" width="4" height="5" fill="#BD4BE7">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.6s"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="15; 5; 15"
            begin="0.6s"
            dur="1s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      <svg
        class="svg-animation"
        width="216"
        height="30"
        viewBox="0 0 216 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 26.5V3.5L22.5 26.5V12H216"
          stroke="url(#paint0_linear_1829_2485)"
          stroke-width="6"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1829_2485"
            x1="216"
            y1="3.5"
            x2="98.0917"
            y2="66.2548"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#BD4BE7" stop-opacity="0" />
            <stop offset="1" stop-color="#BD4BE7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <musitix-icon-svg class="musitix-icon-svg" />
    <p v-if="content">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import MusitixIconSvg from '@/components/icons/MusitixIconSvg.vue'
import { pageLoadingStore } from '@/stores/pageLoading'
import { computed } from 'vue'
const pageLoading = pageLoadingStore()
const content = computed(() => pageLoading.content)
</script>

<style scoped lang="scss">
.loading-layout {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .main-animate {
    margin: 0 15px;
  }

  .musitix-icon-svg {
    color: white;
    margin: 15px;
  }

  p {
    color: white;
    letter-spacing: 1px;
  }

  @keyframes opacityAnimation {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  .svg-animation {
    animation: opacityAnimation 2.5s linear infinite;
  }
  @media (max-width: 576px) {
    .svg-animation {
      max-width: 35vw;
    }
    .musitix-icon-svg {
      max-width: 40vw;
    }
  }
}
</style>
