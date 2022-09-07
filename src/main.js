import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/pages/Home/TypeNav';
// 参数：名字，哪一个组件
Vue.component(TypeNav.name, TypeNav);

Vue.config.productionTip = false

import router from '@/router/index.js';
import { reqCategoryList } from './api';

reqCategoryList();
new Vue({
  render: h => h(App),
  // 注册路由，ES6对象简写
  router,
}).$mount('#app')
