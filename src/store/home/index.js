import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
// home的小仓库

// state存储数据
const state = {
    // state默认初始值
    categoryList: [],
    // banner轮播图
    bannerList: [],
    // floor轮播图
    floorList: [],

};

// 处理action，书写一些业务逻辑，处理异步
const actions = {
    // 调用API，获取分类数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code !== 200) return;
        commit('CATEGORYLIST', result.data);
    },
    async getBannerList({ commit }) {
        const result = await reqGetBannerList();
        if (result.code !== 200) return;
        commit('GETBANNERLIST', result.data);
    },
    async getFloorList({ commit }) {
        const result = await reqFloorList();
        if (result.code !== 200) return;
        commit('GTEFLOORLIST', result.data);
    }
};

// 复杂修改state
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GTEFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};

// 类似计算属性，让组件获取更容易
const getters = {

};

export default { namespaced: true, state, actions, mutations, getters };