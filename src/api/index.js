// API接口进行同一管理
import requests from "./request";
import mockRequests from './mockAjax';
// 三级联动接口 http://gmall-h5-api.atguigu.cn
// /api/product/getBaseCategoryList  get请求 无参数

// 发请求:axios 
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

// banner
export const reqGetBannerList = () => mockRequests.get('/banner');

// floor数据
export const reqFloorList = () => mockRequests.get('/floor');

// 获取搜索模块/api/list POST
// 参数：
// params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params,
});

// 获取商品详情信息
export const reqgetGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get',
});

//产品添加购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})

//获取购物车
export const reqGetShopCart = () => requests({
    url: '/cart/cartList',
    method: 'get',
})

// 删除购物车产品：/api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
},);

// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked} GET
export const reqUpdateCartChecked = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
});
