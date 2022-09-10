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