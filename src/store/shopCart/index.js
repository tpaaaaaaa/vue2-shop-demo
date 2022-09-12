import { reqGetShopCart, reqDeleteCartById, reqUpdateCartChecked } from "@/api";

const state = {
    cartList: [],
};
const actions = {
    // 获取购物车
    async getCartList(context) {
        let result = await reqGetShopCart();
        if (result.code !== 200) return;
        context.commit('GETCAETLIST', result.data);
    },
    // 删除购物车
    async deleteCartListBySkuId(context, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code !== 200) return Promise.reject(new Error('fail'));
        return 'ok';
    },
    // 切换选中状态
    async updateCartCheckedById(constext, { skuId, isChecked }) {
        let result = await reqUpdateCartChecked(skuId, isChecked);
        if (result.code !== 200) return Promise.reject(new Error(result.message));
        return 'ok';
    },
    // 删除选中产品
    deleteCheckedCartById(context) {
        let PromiseAll = [];
        context.getters.cartList.cartInfoList.map(car => {
            if (car.isChecked !== 1) return;
            let promise = context.dispatch('deleteCartListBySkuId', car.skuId) || '';
            PromiseAll.push(promise);
        });
        return PromiseAll;
    },
    // 切换全选
    updateAllcartIsChecked(context, isChecked) {
        const PromiseAll = [];
        context.state.cartList[0].cartInfoList.forEach(car => {
            let promise = context.dispatch('updateCartCheckedById', { skuId: car.skuId, isChecked });
            PromiseAll.push(promise);
        })
        return PromiseAll;
    }
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