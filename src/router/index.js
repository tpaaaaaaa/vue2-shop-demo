// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import store from '@/store';
import { removeToken } from '@/utils/token'

// import { getToken } from '@/utils/token';

// 使用插件
Vue.use(VueRouter);

// 修改VueRouter原型对象push
let originPush = VueRouter.prototype.push;
let OriginReplace = VueRouter.prototype.replace;

// 重写push|replace
// VueRouter.prototype.push = function (loaction, resolve, reject) {
//     if (resolve && reject)
//         originPush.call(this, loaction, resolve, reject);
//     else
//         originPush.call(this, loaction, () => { }, () => { });
// }
VueRouter.prototype.push = async function (loaction) {
    try {
        originPush.call(this, loaction, () => { }, () => { });
    } catch (err) {
        console.log('push方法修改', err);
    }
}
VueRouter.prototype.OriginReplace = async function (loaction) {
    try {
        OriginReplace.call(this, loaction, () => { }, () => { });
    } catch (err) {
        console.log('push方法修改', err);
    }
}

// 配置路由
const router = new VueRouter({
    // 配置路由
    routes,
    //默认页面顶部开始
    scrollBehavior: function (to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    },
});

// 前置守卫（路由跳转前判断）
router.beforeEach(async (to, from, next) => {
    // 获取用户信息
    /**
     * to:去的路由
     * from:将要离开的路由
     * next: 放行函数---next()放行---next(path)放行到指定路由
     */
    let token = store.state.user.token;
    const noEnter = [
        'pay',
        'paysuccess',
        'trade',
        'center',
        'myOrder',
        'groupOrder',
        'addcarsuccess',
        'shopCart',

    ];

    // 未登录
    if (!token) {
        let toPath = to.path;
        if (noEnter.some(route => route === to.name))
            return next('/login?redirect=' + toPath);
        return next();
    }

    // 登陆了还去登录页面
    if (to.name === 'login')
        return next('/home');

    try {
        await store.dispatch('user/getUserInfo');
        next();
    } catch (err) {
        // token失效
        console.log(err.message, 'token失效');
        removeToken('TOKEN');
        next('/login');
    }
    // 登录去得不是login



});

export default router;