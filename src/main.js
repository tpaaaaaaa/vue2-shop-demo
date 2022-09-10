import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
// 参数：名字，哪一个组件
Vue.component(TypeNav.name, TypeNav);

Vue.config.productionTip = false

// 路由
import router from '@/router/index.js';
// 仓库Vuex
import store from './store';
// mockServe.js,引入模拟的数据
import '@/mock/mockServe';
// 引入Swiper样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import { reqGetSearchInfo } from '@/api';
// reqGetSearchInfo();

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
  },
  // 注册路由，ES6对象简写组件属性增加：$route、$router
  router,
  // 注册仓库，属性增加：$store
  store,
}).$mount('#app')
