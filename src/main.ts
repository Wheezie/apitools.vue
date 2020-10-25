import { createApp } from 'vue';

import './registerServiceWorker';
import router from './router';

import App from './App.vue';

import '@/apitools/css/api-global.scss';

createApp(App)
    .use(router)
    .mount('#app')
