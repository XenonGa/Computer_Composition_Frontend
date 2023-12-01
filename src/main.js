import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api';

import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');  
Vue.prototype.$moment = moment;


Vue.use(ElementUI);
// Vue.use(ViewUIPlus);
Vue.prototype.$api = api;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
