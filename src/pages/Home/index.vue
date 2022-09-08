<template>
    <div>
        <!-- 全局组件：三级联动组件  -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <RecommendCompoent></RecommendCompoent>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="carousel of floorList" :key="carousel.id" :floor="carousel"></Floor>

        <Brand></Brand>

    </div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer';
import RecommendCompoent from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';

import { mapState } from 'vuex';
export default {
    name: "HomePage",
    components: { ListContainer, RecommendCompoent, Rank, Like, Floor, Brand },
    computed: {
        ...mapState('home', ['floorList']),
    },
    methods: {
    },
    mounted() {
        this.$store.dispatch('home/getFloorList');
    }
}
</script>

<style>

</style>