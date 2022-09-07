<template>
  <div>
    <Header></Header>

    <!-- 路由组件的出口 -->
    <router-view></router-view>
    <!--登录注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/';
import Footer from './components/Footer/';
export default {
  name: 'App',
  components: { Header, Footer },
  mounted() {
    // 通知Vuex发请求，获取数据，存储仓库
    this.$store.dispatch('home/categoryList');
  },

}
</script>

<style scoped>
</style>