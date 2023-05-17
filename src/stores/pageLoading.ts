import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const pageLoadingStore = defineStore('pageLoading', () => {
  const loading = ref<boolean>(false)
  const content = ref<string>('')
  let loadingStartTime: number | null = null

  const changeLoadingStatus = (status: boolean) => {
    if (status) {
      loadingStartTime = Date.now() // 計時
      loading.value = true
    } else {
      const elapsedTime = Date.now() - (loadingStartTime || 0)
      const minimumDelay = 1500 // 最少維持秒數

      if (elapsedTime < minimumDelay) {
        //未滿秒數，延遲處理
        const remainingTime = minimumDelay - elapsedTime

        setTimeout(() => {
          loading.value = false
        }, remainingTime)
      } else {
        loading.value = false
      }
    }
  }

  const changeLoadingContent = (text: string) => {
    content.value = text
  }

  watch(loading, (newValue) => {
    if (!newValue) {
      content.value = ''
    }
  })

  return { loading, changeLoadingStatus, content, changeLoadingContent }
})
