import { reqgetGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
// 临时游客身份uuid---生成一个随机字符串
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodsInfo: {},
    // 游客临时身份
    uuid_token: getUUID(),
};
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqgetGoodsInfo(skuId);
        if (result.code !== 200) return;
        commit('GETGOODSINFO', result.data);
    },
    // 添加购物车，返回200表示操作成功
    async addOrUpdateShopCart(cosntext, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum); cosntext;
        if (result.code !== 200) return Promise.reject(new Error('fail'));
        // console.log(result);
        return 'ok';
    },

};
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    },
};
const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo?.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodsInfo?.spuSaleAttrList || [];
    },
    valuesSkuJson(state) {
        return state.goodsInfo?.valuesSkuJson || '';
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}