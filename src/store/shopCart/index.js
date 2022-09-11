import { reqGetShopCart } from "@/api";

const state = {
    cartList: [],
};
const actions = {
    // 获取购物车
    async getCartList(context) {
        let result = await reqGetShopCart();
        if (result.code !== 200) return;
        context.commit('GETCAETLIST', result.data);
    }
    // reqGetShopCart
};
const mutations = {
    GETCAETLIST(state, value) {
        state.cartList = value;
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || [];
    }
};

export default {
    namespaced: true, state, actions, mutations, getters,
}