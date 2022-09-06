<template>
    <div>
        <h1>{{$route.params.keyword}}</h1>---{{keyword}}--{{k}}
        <h1>{{$route.query.k}}</h1>
        搜索
    </div>
</template>

<script>
export default {
    name: 'SearchPage',
    props: ['keyword', 'k'],

}
</script>

<style>
</style>