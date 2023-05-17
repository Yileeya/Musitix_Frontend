import {defineStore} from 'pinia'
import {ref} from "vue";

export const pageLoadingStore = defineStore('pageLoading', () => {
    const loading = ref<boolean>(false)
    const content = ref<string>('')

    const changeLoadingStatus = (status: boolean) => {
        loading.value = status
        content.value = ''
    }
    const changeLoadingContent = (text: string) => {
        content.value = text
    }
    return {loading, changeLoadingStatus, content, changeLoadingContent}
})