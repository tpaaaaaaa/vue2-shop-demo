<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseenter="enterShow" @mouseleave="enterHide">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <!-- 三级数据展示 -->
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">

                            <div class="item" v-for="c1 of categoryList.slice(0,-1)"
                                 :key="c1.categoryId"
                                 :class="{cur:currentIndex===c1.categoryId}">
                                <h3 @mouseenter="changeIndex(c1.categoryId)"
                                    @mouseleave="changeIndex(-1)">
                                    <a href=""
                                       :data-category-name="c1.categoryName"
                                       :data-category-id="'1,'+c1.categoryId">
                                        {{c1.categoryName}}
                                    </a>
                                </h3>
                                <div class="item-list clearfix">

                                    <div class="subitem" v-for="c2 of c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a href=""
                                                   :data-category-name="c2.categoryName"
                                                   :data-category-id="'2,'+c2.categoryId">
                                                    {{c2.categoryName}}
                                                </a>
                                            </dt>
                                            <dd>

                                                <em v-for="c3 of c2.categoryChild" :key="c3.categoryId">
                                                    <a href=""
                                                       :data-category-name="c3.categoryName"
                                                       :data-category-id="'3,'+c3.categoryId">
                                                        {{c3.categoryName}}
                                                    </a>
                                                </em>

                                            </dd>
                                        </dl>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </transition>

            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// 按需引入
import throttle from 'lodash/throttle';
export default {
    name: 'TypeNav',
    data() {
        return {
            // 一级分类鼠标悬浮效果
            currentIndex: -1,
            show: true,
        }
    },
    computed: {
        ...mapState('home', ['categoryList']),
    },
    methods: {
        // 鼠标进入：鼠标悬浮改变当前currentIndex
        changeIndex: throttle(function (i) {
            this.currentIndex = i;
        }, 50),
        // 三级联动分类点击传参并跳转
        goSearch(e) {
            e.preventDefault();
            const elA = e.target.closest('a');
            if (!elA) return;
            const { categoryName, categoryId } = elA.dataset;
            // 判断数据属性是否存在
            if (!categoryName) return;
            if (!categoryId) return;
            const location = {
                name: 'search',
                query: {
                    categoryName,
                    categoryType: +categoryId.split(',')[0],
                    categoryId: +categoryId.split(',')[1],
                },
            };

            // 保存三级分类和搜索输入的参数
            if (this.$route.params)
                location.params = this.$route.params;

            this.$router.push(location);
        },
        enterShow() {
            this.show = true;
        },
        enterHide() {
            this.currentIndex = -1;
            if (this.$route.name === 'home') return;
            this.show = false;
        }
    },
    // 组件挂在完毕，向服务器挂请求
    mounted() {
        // 通知Vuex发请求，获取数据，存储仓库
        // if (this.$store.state.home.categoryList) {
        //     this.$store.dispatch('home/categoryList');
        //     console.log('API');
        // }
        // /组件挂在成功
        if (this.$route.path !== '/home')
            this.show = false;

    },

}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }


                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }


                }

                .item.cur {
                    background-color: skyblue;
                    cursor: pointer;
                }
            }
        }

        // 过渡动画样式
        //开始
        .sort-enter,
        .sort-leave-to {
            height: 0;
            opacity: 0;
            // transform: rotate(0deg);
        }

        // 结束
        .sort-enter-to,
        .sort-leave {
            height: 461px;
            opacity: 1;
            // transform: rotate(360deg);
        }

        // 动画时间、速率
        .sort-enter-active,
        .sort-leave-active {
            transition: all .5s linear;
        }
    }
}
</style>