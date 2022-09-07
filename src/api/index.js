// API接口进行同一管理
import requests from "./request";

// 三级联动接口 http://gmall-h5-api.atguigu.cn
// /api/product/getBaseCategoryList  get请求 无参数

// 发请求:axios 
export const reqCategoryList = () => requests({ url: '/api/product/getBaseCategoryList', method: 'get' });

