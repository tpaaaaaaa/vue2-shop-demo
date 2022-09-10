import { reqGetSearchInfo } from "@/api";

// search的小仓库
// state存储数据
const state = {
    searchList: {},
};

// 处理action，书写一些业务逻辑，处理异步
const actions = {
    // 获取Search
    async getSearchList({ commit }, params = {}) {
        const result = await reqGetSearchInfo(params);
        if (result.code !== 200) return;
        commit('GETSEARCHINFO', result.data);
    }
};


// 复杂修改state
const mutations = {
    GETSEARCHINFO(state, searchList) {
        state.searchList = searchList;
    }
};

// 计算属性，简化仓库中数据（展开数据更好获取）
const getters = {
    goodsList(state) {
        return state?.searchList.goodsList;
    },
    trademarkList(state) {
        return state?.searchList.trademarkList;
    },
    attrsList(state) {
        return state?.searchList.attrsList;
    },
    total(state) {
        return state?.searchList.total;
    }
};

export default { namespaced: true, state, actions, mutations, getters };