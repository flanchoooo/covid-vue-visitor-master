import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import '@/assets/css/main.css'
import authHeader from "./services/auth-header";
import BootstrapVue from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import VueQrcode from '@chenfengyuan/vue-qrcode';

Vue.component(VueQrcode.name, VueQrcode);

// register globally
Vue.component('multiselect', Multiselect)


require('@/store/subscriber');


axios.defaults.baseURL = 'http://144.91.64.120:35610/api/';

axios.defaults.headers.common['Authorization'] = authHeader();

Vue.config.productionTip = true;
Vue.use(BootstrapVue);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
