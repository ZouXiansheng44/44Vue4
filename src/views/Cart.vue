<template>
    <div class="cart">
        <nav><router-link to="/productList">继续购物</router-link> </nav>
        <span>当前用户：{{this.$store.state.loginuser}}</span>
        <table>
            <thead>
                <tr>
                    <th>序号</th> <th>产品图片</th> <th>产品名称</th> <th>产品单价</th> <th>产品数量</th><th>小计</th><th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in this.$store.state.cartList" :key="index">
                    <td>{{index+1}}</td>
                    <td><img></td>
                    <td>{{item.name}}</td>
                    <td>{{item.price}}</td>
                    <td>
                        <button @click="modify(index,1)">+</button>
                        <input type="text" v-model="item.count"></input>
                        <button @click="modify(index,-1)">-</button>
                    </td>
                    <td>{{item.price*item.count}}</td>
                    <td><Button @click="del(index)">删除</Button></td>
                </tr>
            </tbody>
            <tfoot>
                总计：{{total}}
            </tfoot>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Cart",
        computed:{
            total(){
                let total = 0;
                this.$store.state.cartList.forEach((item)=>{
                    total +=item.price*item.count;
                });
                return total;
            }
        },
        methods:{
            modify(index,n){
                this.$store.commit("modifyCartCount",{index:index,num:n});
            },
            modifyCartCount(state,obj){
                var count = parseInt(state.cartList[obj.index].count);
                count = count + obj.num;
                if(count>=1)
                  state.cartList[obj.index].count=count;
                else
                   state.cartList[obj.index].count =1 ;
            },
            del(index){
                this.$store.index('deleteCart',index);
            }
        }
    }
</script>

<style scoped>

</style>