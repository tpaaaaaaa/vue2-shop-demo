import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// // state存储数据
// const state = {
//     count: 1,
// };

// // 处理action，书写一些业务逻辑，处理异步
// const actions = {
//     add(context, value) {
//         context.commit('ADD', value);
//     },
// };

// // 复杂修改state
// const mutations = {
//     ADD(state, count) {
//         state.count = ++count;
//     },
// };

// // 类似计算属性，让组件获取更容易
// const getters = {
// };

import home from '@/store/home';
import search from '@/store/search';
import detail from '@/store/detail';
import shopCart from '@/store/shopCart';


// 对外暴露Store类的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart
    }
});