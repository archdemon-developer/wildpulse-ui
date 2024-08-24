import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import firebase from 'firebase/compat/app'

import { firebaseConfig } from './config/gcp.auth'

const app = createApp(App)

firebase.initializeApp(firebaseConfig)

app.use(createPinia())
app.use(router)

app.mount('#app')
