<template>
    <div>
        <!-- Search -->
        <TypeNav></TypeNav>

        <!--list-content-->
        <div class="main">
            <div class="py-container">
                <!--bread-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 分类面包屑 -->
                        <li class="with-x" v-if="this.searchParams.categoryName">
                            {{this.searchParams.categoryName}}
                            <i @click="removeCategoryName('categoryName')">×</i>
                        </li>
                        <!-- 关键字面包屑 -->
                        <li class="with-x" v-if="this.searchParams.keyword">
                            {{this.searchParams.keyword}}
                            <i @click="removeCategoryName('keyword')">×</i>
                        </li>
                        <!-- 品牌面包屑 -->
                        <li class="with-x" v-if="this.searchParams.trademark">
                            {{this.searchParams.trademark.split(':')[1]}}
                            <i @click="removeCategoryName('trademark')">×</i>
                        </li>
                        <!-- 商品属性面包屑 -->
                        <li class="with-x" v-for="(prop,index) of this.searchParams.props" :key="index">
                            {{prop.split(':')[1]}}
                            <i @click="removeCategoryName('props',index)">×</i>
                        </li>
                    </ul>
                </div>

                <!-- Search Selector -->
                <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"></SearchSelector>

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav" @click="changeOrder">
                                <li :class="{active:isOrder}" data-sort-type="综合">
                                    <a>
                                        综合
                                        <span v-show="isOrder">
                                            <svg v-show="isAsc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" class="w-5 h-5">
                                                <path fill-rule="evenodd"
                                                      d="M10 18a.75.75 0 01-.75-.75V4.66L7.3 6.76a.75.75 0 11-1.1-1.02l3.25-3.5a.75.75 0 011.1 0l3.25 3.5a.75.75 0 01-1.1 1.02l-1.95-2.1v12.59A.75.75 0 0110 18z"
                                                      clip-rule="evenodd" />
                                            </svg>

                                            <svg v-show="isDesc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" class="w-5 h-5">
                                                <path fill-rule="evenodd"
                                                      d="M10 2a.75.75 0 01.75.75v12.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z"
                                                      clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a>销量</a>
                                </li>
                                <li>
                                    <a>新品</a>
                                </li>
                                <li>
                                    <a>评价</a>
                                </li>
                                <li :class="{active:isPriceOrder}" data-sort-type="价格">
                                    <a>
                                        价格
                                        <span v-show="isPriceOrder">
                                            <svg v-show="isAsc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" class="w-5 h-5">
                                                <path fill-rule="evenodd"
                                                      d="M10 18a.75.75 0 01-.75-.75V4.66L7.3 6.76a.75.75 0 11-1.1-1.02l3.25-3.5a.75.75 0 011.1 0l3.25 3.5a.75.75 0 01-1.1 1.02l-1.95-2.1v12.59A.75.75 0 0110 18z"
                                                      clip-rule="evenodd" />
                                            </svg>

                                            <svg v-show="isDesc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                 fill="currentColor" class="w-5 h-5">
                                                <path fill-rule="evenodd"
                                                      d="M10 2a.75.75 0 01.75.75v12.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z"
                                                      clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                        <!-- <span v-show="isAsc"> ⬆</span>
                                        <span v-show="isDesc">⬇</span> -->
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">

                            <li class="yui3-u-1-5" v-for="goods of goodsList" :key="goods.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link :to="`/detail/${goods.id}`">
                                            <img :src="goods.defaultImg" />
                                        </router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>{{goods.price}}.00</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <router-link :to="`/detail/${goods.id}`"
                                                     :title="goods.title">{{goods.title}}
                                        </router-link>
                                    </div>
                                    <div class=" commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                           class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>

                    <PaginationCompoent
                                        :pageNo="searchParams.pageNo"
                                        :pageSize="searchParams.pageSize"
                                        :total="total"
                                        :continues="5"
                                        @getPageNo="getPageNo">
                    </PaginationCompoent>

                </div>
                <!--hotsale-->
                <div class="clearfix hot-sale">
                    <h4 class="title">热卖商品</h4>
                    <div class="hot-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/search/like_01.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/search/like_03.png" />
                                    </div>
                                    <div class="attr">
                                        <em>金属A面，360°翻转，APP下单省300！</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/search/like_04.png" />
                                    </div>
                                    <div class="attr">
                                        <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4068.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有20人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/search/like_02.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import SearchSelector from '@/pages/Search/SearchSelector'
import { mapGetters } from 'vuex';
export default {
    name: "SearchPage",
    components: { SearchSelector },
    data() {
        return {
            // 请求参数
            searchParams: {
                // 分类级别
                "category1Id": "",
                "category2Id": "",
                "category3Id": "",
                // 分类名
                "categoryName": "",
                // 关键字
                "keyword": "",
                // 排序:默认1:desc--综合降序 2:asc---价格升序
                "order": "1:desc",
                // 当前页
                "pageNo": 1,
                // 总页数
                "pageSize": 3,
                // 平台搜索属性数据
                "props": [],
                // 品牌
                "trademark": ""
            },

        };
    },
    computed: {
        ...mapGetters('search', ['goodsList', 'trademarkList', 'attrsList', 'total']),
        isOrder() {
            return this.searchParams.order.includes('1');
        },
        isAsc() {
            return this.searchParams.order.includes('asc');
        },
        isDesc() {
            return this.searchParams.order.includes('desc');
        },
        isPriceOrder() {
            return this.searchParams.order.includes('2');
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                // 合并请求参数
                this.searchParams.category1Id = undefined;
                this.searchParams.category2Id = undefined;
                this.searchParams.category3Id = undefined;
                Object.assign(this.searchParams, this.$route.query, this.$route.params);
                this.getData();
            }
        }
    },
    methods: {
        // API搜索
        getData() {
            // 发送搜索请求
            this.$store.dispatch('search/getSearchList', this.searchParams);
        },
        // 删除分类/关键字名字
        removeCategoryName(type, index) {
            if (type !== 'categoryName' && type !== 'keyword' && type !== 'trademark' & type !== 'props') return;

            this.searchParams[type] = undefined;
            // 分类
            if (type === 'categoryName')
                this.$router.push({ name: 'search', params: this.$route.params });

            // 关键字
            if (type === 'keyword') {
                this.$router.push({ name: 'search', query: this.$route.query });
                // 通知Header清除关键字
                this.$bus.$emit('clear');
            }
            // 品牌
            if (type === 'trademark')
                this.getData();
            // 商品属性
            if (type === 'props') {
                if (!Array.isArray(this.searchParams.props))
                    this.searchParams.props = [];
                else
                    this.searchParams.props.splice(index, 1);

                this.getData();
            }

        },
        // 自定义事件
        trademarkInfo(trademark) {
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
            this.getData();
        },
        attrInfo(attr, value) {
            let props = `${attr.attrId}:${value}:${attr.attrName}`
            if (this.searchParams.props.includes(props)) return;

            this.searchParams.props.push(props);
            this.getData();
        },
        // 排序
        changeOrder(e) {
            const type = e.target.closest('li').dataset.sortType;
            const sort = this.searchParams.order.split(':');
            let newOrderType;
            let newOrder = sort[1] === 'desc' ? 'asc' : 'desc';

            if (!type) return;
            if (type === '综合')
                newOrderType = 1;
            if (type === '价格')
                newOrderType = 2;

            newOrder = newOrderType === +sort[0] ? newOrder : 'desc';
            this.searchParams.order = `${newOrderType}:${newOrder}`;
            this.getData();
        },
        getPageNo(pageNo) {
            this.searchParams.pageNo = pageNo;
            this.getData();
        }
    },
    mounted() {

    }
}
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: 5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }


        }

        .hot-sale {
            margin-bottom: 5px;
            border: 1px solid #ddd;

            .title {
                font-weight: 700;
                font-size: 14px;
                line-height: 21px;
                border-bottom: 1px solid #ddd;
                background: #f1f1f1;
                color: #333;
                margin: 0;
                padding: 5px 0 5px 15px;
            }

            .hot-list {
                padding: 15px;

                ul {
                    display: flex;

                    li {
                        width: 25%;
                        height: 100%;

                        .list-wrap {

                            .p-img,
                            .price,
                            .attr,
                            .commit {
                                padding-left: 15px;
                            }

                            .p-img {
                                img {
                                    max-width: 100%;
                                    vertical-align: middle;
                                    border: 0;
                                }
                            }

                            .attr {
                                width: 85%;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                            }

                            .price {
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: 5px;
                                    }
                                }
                            }

                            .commit {
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;
                            }
                        }
                    }
                }
            }
        }
    }
}

svg {
    width: 13px;
}
</style>