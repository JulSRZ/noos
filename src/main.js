/*eslint-disable */
import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import money from 'v-money3'
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


library.add(fas);

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(money)
  .use(store)
  .use(router)
  .mount('#app');
