// 对axios进行封装
import axios from "axios";
// 进度条
import nProgress from "nprogress";
// 进度条样式
import 'nprogress/nprogress.css';

const requests = axios.create({
    // 配置对象
    // 发请求的时候路径会出现api
    baseURL: '/api',
    // 请求超时的时间
    timeout: 500,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
    nProgress.start();//进度条开始
    nProgress.inc();//进度条增加
    // config 配置对象
    return config;
});

// 响应拦截器
requests.interceptors.response.use((res) => {
    nProgress.done();//进度条结束
    // 成功的回调
    return res.data;
}, err => {
    // 响应失败的回调
    nProgress.done();
    return Promise.reject(new Error('faile', err));
});


// 对外暴露
export default requests;