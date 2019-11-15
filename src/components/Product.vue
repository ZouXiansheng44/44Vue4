<template>
    <div class="product">
        <img src="" alt="">
        <p>商品名称：{{info.name}}</p>
        <p>商品价格：{{info.price}}</p>
        <p><router-link :to="{name:'details',query:{id:info.id}}">查看详情</router-link></p>
    </div>
</template>

<script>
    export default {
        name: "Product",
        data() {
            return {
            }
        },
        props:['info']
    }
</script>

<style scoped>

</style>