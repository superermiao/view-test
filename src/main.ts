import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ConfirmPlugin from '@/components/confirm-dialog/index'
createApp(App).use(router).use(ConfirmPlugin).mount('#app')
