import Vue from 'vue';
import App from './App.vue';
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination';
import { Button, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

// 参数：名字，哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component('PaginationCompoent', Pagination);
Vue.component(Button.name, Button);
// ElementUI注册组件，可以放在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


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

// 统一接口api的请求函数
// 同一引入
import * as API from '@/api';
import * as NumberFormat from '@/utils/NumberFormat.js';


// 引入懒加载插件
import tp from '@/assets/1.jpg';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  lodaing: tp,
});

// 引入表单校验插件
import "@/plugins/validate.js";

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;//放在Vm原型对象上
    Vue.prototype.$NumberFormat = NumberFormat;//放在Vm原型对象上
  },
  // 注册路由，ES6对象简写组件属性增加：$route、$router
  router,
  // 注册仓库，属性增加：$store
  store,
}).$mount('#app')
