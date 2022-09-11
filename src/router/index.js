// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './routes'

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
export default new VueRouter({
    // 配置路由
    routes,
    //默认页面顶部开始
    scrollBehavior: function (to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    },
});