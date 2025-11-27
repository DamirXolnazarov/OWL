import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Vue3Autocounter from 'vue3-autocounter';
import router from './router'

const app = createApp(App)

app.use(router)
app.component('vue3-autocounter', Vue3Autocounter)
app.mount('#app')
