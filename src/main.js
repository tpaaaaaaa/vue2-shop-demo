import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from '@/router/index.js';
new Vue({
  render: h => h(App),
  // 注册路由，ES6对象简写
  router,
}).$mount('#app')
