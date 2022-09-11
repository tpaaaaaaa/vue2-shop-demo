<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(slide,index) of skuImageList" :key="slide.id">
                <img @click="changeCurrentIndex(skuImageList,slide,index)" :class="{active:slide.isDefault==='1'}"
                     :src="slide.imgUrl" />
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
</template>

<script>
import Swiper, { Navigation } from 'swiper';

export default {
    name: 'ImageListComponent',
    props: ['skuImageList'],
    data() {
        return {
            currentIndex: -1,
        }
    },
    methods: {
        changeCurrentIndex(List, slide, index) {
            List.map(item => item.isDefault = '0');
            slide.isDefault = '1';
            // 切换图片
            this.$bus.$emit('getIndex', index);
        },
    },
    mounted() {
        this.$nextTick(() => {
            new Swiper('.swiper', {
                modules: [Navigation],
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                slidesPerView: 3,
                slidesPerGroup: 3,
            });
        })
    }
}
</script>

<style lang="less" scoped>
.swiper {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
        width: 56px;
        height: 56px;

        img {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            padding: 2px;
            width: 50px;
            height: 50px;
            display: block;

            &.active {
                border: 2px solid #f60;
                padding: 1px;
            }

            &:hover {
                border: 2px solid #f60;
                padding: 1px;
            }
        }
    }

    .swiper-button-next {
        left: auto;
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
        right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;

        &::after {
            font-size: 12px;
        }
    }
}
</style>