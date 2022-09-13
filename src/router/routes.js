// 引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import addCarSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';

export default [
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true },
    },
    {
        name: 'addcarsuccess',
        path: '/addcarsuccess',
        component: addCarSuccess,
        meta: { show: true },
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: true },
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { show: true },
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        // 路由组件传递props数据
        //布尔值：只传params
        // props: true,
        // 对象
        // props:{a:1,b:2}
        // 函数写法
        props: ($route) => {
            ({
                keyword: $route.params.keyword,
                k: $route.query.k,
            })
        },
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { show: false },

    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { show: false },

    },
    // 重定向，在项目跑起来的时候访问/，定向到首页
    {
        path: '*',
        redirect: '/home',
    }
];