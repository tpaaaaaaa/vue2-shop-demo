<template>
    <div class="spec-preview">
        <img :src="imgObj" />
        <div class="event" @mousemove="handler"></div>
        <div class="big">
            <img :src="imgObj" ref="big" />
        </div>
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
import throttle from 'lodash/throttle'
export default {
    name: 'ZoomComponent',
    props: ['skuImageList'],
    data() {
        return {
            currentImg: 0,
        }
    },
    computed: {
        imgObj() {
            return this.skuImageList[this.currentImg]?.imgUrl;
        }
    },
    methods: {
        // 放大镜区域控制
        handler:
            throttle(function (e) {
                const mask = this.$refs.mask;
                const big = this.$refs.big;
                const maskSize = mask.getBoundingClientRect();
                let left = e.offsetX - maskSize.width / 2;
                let top = e.offsetY - maskSize.height / 2;
                // 判断范围
                if (left <= 0) left = 0;
                if (top <= 0) top = 0;
                if (left >= maskSize.width) left = maskSize.width;
                if (top >= maskSize.height) top = maskSize.width;

                mask.style.left = left + 'px';
                mask.style.top = top + 'px';
                big.style.left = -2 * left + 'px'
                big.style.top = -2 * top + 'px';
            }, 50)


    },
    mounted() {
        // 接收切换图片
        this.$bus.$on('getIndex', (index) => {
            this.currentImg = index;
        })
    },

}
</script>


<style lang="less">
.spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        display: none;
        background: white;

        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .event:hover~.mask,
    .event:hover~.big {
        display: block;
    }
}
</style>