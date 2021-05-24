import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import fastClick from 'fastclick'
import { Swipe, SwipeItem } from 'vant'
import { Lazyload } from 'vant'
import { Loading } from 'vant'
import { Sticky } from 'vant'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { Progress } from 'vant'
import { Slider } from 'vant'
import { Tab, Tabs } from 'vant'

const loadimage = require('./assets/img/loading.jpeg')
const errorimage = require('./assets/img/error.jpg')

fastClick.attach(document.body)

Vue.use(Lazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1
});
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Loading);
Vue.use(Sticky);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Progress);
Vue.use(Slider);
Vue.use(Tab);
Vue.use(Tabs);

Toast.setDefaultOptions({ duration: 500 });

const https = axios.create({
  baseURL: 'https://autumnfish.cn/',
  timeout: 5000,
  withCredentials: true
})

Vue.prototype.$https = https

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
