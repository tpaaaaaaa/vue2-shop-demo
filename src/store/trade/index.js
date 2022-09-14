import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
    addressInfo: [],
    orderInfo: {},

};
const actions = {
    // 获取一个用户地址信息
    async getUserAddressInfo(context) {
        let result = await reqAddressInfo();
        if (result.code !== 200) return Promise.reject(new Error('fail'));
        context.commit('GETUSERADDRESS', result.data);
    },
    //获取商品清单数据
    async getOrderInfo(context) {
        let result = await reqOrderInfo();
        if (result.code !== 200) return;
        context.commit('GETORDERINFO', result.data)
    },

};
const mutations = {
    GETUSERADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}