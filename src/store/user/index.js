import { reqGetCode, reqRegister, reqUserLogin, reqGetUserInfo, reqLogout } from "@/api";
import { seToken, getToken, removeToken } from "@/utils/token";

const state = {
    code: 0,
    token: getToken(),
    userInfo: {},
};
const actions = {
    // 获取验证码
    async getCode(context, phone) {
        // 获取接口把验证码返回，正常情况应该发给注册手机
        let result = await reqGetCode(phone);
        if (result.code !== 200) return Promise.reject(new Error('fail，验证码'));
        context.commit('GETCODE', result.data);
        return 'ok';
    },
    // 注册
    async getRegister(context, user) {
        let result = await reqRegister(user);
        if (result.code !== 200) return Promise.reject(new Error('fail'));
        return 'ok';
    },
    // 登录[token]
    async userLogin(context, data) {
        let result = await reqUserLogin(data);
        if (result.code !== 200) return Promise.reject(new Error('fail'));
        // 登陆成功，获取到token
        context.commit('USERLOGIN', result.data.token);
        // 持久化token
        seToken(result.data.token);
        return 'ok';
    },
    async getUserInfo(context) {
        let result = await reqGetUserInfo();
        if (result.code !== 200) return Promise.reject(new Error('fail'));
        context.commit('GETUSERINFO', result.data)
        return 'ok';
    },
    // 退出登录
    async userLogout(context) {
        let result = await reqLogout();
        if (result.code !== 200) return Promise.reject(new Error('fail'));
        context.commit('CLEAR');
    }


};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        // 把仓库用户信息清空
        state.token = '';
        state.userInfo = '';
        // 本地存储清空
        removeToken();

    }
};
const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}