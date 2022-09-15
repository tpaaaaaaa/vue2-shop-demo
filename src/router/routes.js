// 路由懒加载

// 引入一级路由组件
const Home = () => import('@/pages/Home');
const Search = () => import('@/pages/Search');
const Login = () => import('@/pages/Login');
const Register = () => import('@/pages/Register');
const Detail = () => import('@/pages/Detail');
const addCarSuccess = () => import('@/pages/AddCartSuccess');
const ShopCart = () => import('@/pages/ShopCart');
const Trade = () => import('@/pages/Trade');
const Pay = () => import('@/pages/Pay');
const PaySuccess = () => import('@/pages/PaySuccess');
const Center = () => import('@/pages/Center');

// 引入二级路由
const MyOrder = () => import('@/pages/Center/myOrder');
const GroupOrder = () => import('@/pages/Center/groupOrder');



// 路由配置信息
export default [
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { show: true },
        children: [//通过children配置子路由
            {
                name: 'myOrder',
                path: 'myorder',
                component: MyOrder,
            },
            {
                name: 'goroupOrder',
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myOrder',
            }
        ]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true },
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.name === 'trade')
                return next(); to;
            next(false);

        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.name === 'shopCart')
                return next();
            if (from.name === null)
                return next('shopCart');
            next(false);
        }
    },
    {
        name: 'shopCart',
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