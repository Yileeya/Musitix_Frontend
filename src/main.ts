import { createApp } from 'vue'
import './assets/main.scss'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import { createPinia } from 'pinia'
import CKEditor from '@ckeditor/ckeditor5-vue'

const app = createApp(App)

app.use(createPinia()).use(router).use(CKEditor).mount('#app')
