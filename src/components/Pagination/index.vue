<template>
    <div class="fr page">
        <div class="sui-pagination clearfix">
            <ul>
                <li class="prev" :class="{disabled:pageNo===1}" @click="$emit('getPageNo',pageNo-1)">
                    <button :disabled="pageNo===1">«上一页</button>
                </li>
                <li :class="{active:pageNo===1}" v-if="startAndEndNum.start>1" @click="$emit('getPageNo',1)">
                    <a>1</a>
                </li>
                <li class="dotted" v-if="startAndEndNum.start>2"><span>...</span></li>

                <template v-for="(page,index) in startAndEndNum.end">
                    <li :key="index"
                        v-if="page>=startAndEndNum.start"
                        @click="$emit('getPageNo',page)"
                        :class="{active:pageNo===page}">
                        <a>{{page}}</a>
                    </li>
                </template>


                <li class="dotted" v-if="startAndEndNum.end<totalPage"><span>...</span></li>
                <li v-if="startAndEndNum.end<totalPage-1" @click="$emit('getPageNo',totalPage)">
                    <a>{{totalPage}}</a>
                </li>
                <li class="next"
                    @click="$emit('getPageNo',pageNo+1)"
                    :class="{disabled:pageNo===totalPage,active:pageNo===totalPage}">
                    <button :disabled="pageNo===totalPage">下一页»</button>
                </li>
            </ul>
            <div><span>共{{total}}条数据</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaginationCompoents',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        // 总页数
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        // 连续的页码起始到结束
        startAndEndNum() {
            let start = 0, end = 0;

            // 正常现象
            start = this.pageNo - (this.continues - this.continues % 2) / 2;
            end = this.pageNo + (this.continues - this.continues % 2) / 2;


            // 需显示的连续页数大于总页数
            if (this.continues >= this.totalPage) {
                start = 1;
                end = this.totalPage;
            }

            // 开始页附近
            if (start < 1) {
                start = 1;
                end = this.continues;
            }

            // 结束页附近
            if (end > this.totalPage) {
                start = this.totalPage - this.continues;
                end = this.totalPage;
            }

            return { start, end };
        }
    }

}
</script>

<style lang="less" scoped>
.page {
    margin: 18px 0;
    text-align: center;

    .sui-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;

        ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            display: flex;
            gap: 7px;

            li {
                line-height: 18px;

                a {
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #f8f9fa;
                    border-radius: 6px;
                    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.16);
                    margin-left: -1px;
                    font-size: 14px;
                    padding: 9px 18px;
                    color: #333;
                    cursor: pointer;
                }

                &.active {
                    a {
                        background-color: #69db7c;
                        color: #fff;
                        cursor: default;
                        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.05);
                    }
                }

                &.prev {
                    a {
                        background-color: #f8f9fa;
                    }
                }

                &.disabled {
                    a {
                        color: #999;
                        cursor: default;
                    }
                }

                &.dotted {
                    span {
                        margin-left: -1px;
                        position: relative;
                        float: left;
                        line-height: 18px;
                        text-decoration: none;
                        background-color: #fff;
                        font-size: 14px;
                        border: 0;
                        padding: 9px 18px;
                        color: #333;
                    }
                }

                &.next {
                    a {
                        background-color: #f8f9fa;
                    }
                }

                button {
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #f8f9fa;
                    border-radius: 6px;
                    border: none;
                    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.16);
                    margin-left: -1px;
                    font-size: 14px;
                    padding: 9px 18px;
                    color: #333;
                    cursor: pointer;
                }
            }
        }

        div {
            color: #333;
            font-size: 14px;
            background-color: #f8f9fa;
            border-radius: 6px;
            box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.16);
            padding: 9px 18px;
        }
    }
}
</style>