// home的小仓库

// state存储数据
const state = {
    count: 1,
};

// 处理action，书写一些业务逻辑，处理异步
const actions = {
    add(context) {
        context.commit('ADD');
    },
};

// 复杂修改state
const mutations = {
    ADD(state) {
        ++state.count;
    },
};

// 类似计算属性，让组件获取更容易
const getters = {

};

export default { namespaced: true, state, actions, mutations, getters };