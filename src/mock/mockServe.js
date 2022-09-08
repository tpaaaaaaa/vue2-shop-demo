// 引入mockjs
import Mockjs from "mockjs";

// 引入json数据文件
// webpack默认对外暴露：图片、JSON数据格式
import banner from './banner.json';
import floor from './floor.json';

//mock数据：(参数请求地址，请求数据)
Mockjs.mock('/mock/banner', { code: 200, data: banner });//轮播图
Mockjs.mock('/mock/floor', { code: 200, data: floor });