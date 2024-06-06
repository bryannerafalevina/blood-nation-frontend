

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const app = createApp(App)
// const pinia = createPinia();
const pinia = createPinia();

app.mixin({
    mounted() {

    },
  });

// app.use(createPinia())
app.use(pinia);
app.use(Toast);
app.use(router);
app.mount('#app')