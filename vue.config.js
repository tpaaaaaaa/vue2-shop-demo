const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint检查
  // lintOnSave:false,
  // 代理服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',//请求的API服务器
        pathRewrite: { '^/api': '' },////重写地址：避免连带请求前缀到API服务器去

      }
    }
  }
});
