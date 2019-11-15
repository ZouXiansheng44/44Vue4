<template>
    <div class="details">
        <img :src="prop.imgurl" alt="">
        <div>
            <p>产品名称：{{prod.name}}</p>
            <p>产品价格：{{prod.price}}元</p>
            <p>详细说明{{prod.desc}}</p>
            <p><Button type="primary" @click="addCart()">点击购买</Button></p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Details",
        data(){
            return{
                prod:null
            }
        },
        created(){
            //根据产品ID获得产品相应信息
            var id =this.$store.query.id;
            //将具体的信息绑定到相应的网页元素上
            this.prod=this.getProdById(id)
        },
        methods:{
            getProdById(){
                var prod = this.$store.state.prodList.find((item)=>{
                        return(item.id==id)
                });
                return prod;
            },
            addCart(){
                //1将产品放到购物车列表中
                this.$store.commit('addCart',{
                    id:this.prop.id,
                    name:this.prop.name,
                    price:this.prop.price,
                    imgUrl:this.prop.imgurl,
                    count:1});
                //2跳转到购物车组件
                this.$router.push('/cart');
            }
        }
    }
</script>

<style scoped>

</style>