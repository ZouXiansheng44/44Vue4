<template>
    <div class="productlist">
        <nav>
            <span>欢迎您：{{this.$store.state.loginuser}}</span>
            <p><Button to="/login" @click.native="logout()">登出</Button></p>
        </nav>
        <div>
            <product v-for="(item,index) in prodList" :info="item" :key="index" ></product>
        </div>
        <div class="page">
            <!--total与change既然是函数为什么不带括号-->
            <Page :total="total" :current="current" :page-size="size"
                  prev-text="上一页" next-text="下一页" @on-change="change"/>
        </div>
    </div>

</template>

<script>
    import Product from "../components/Product";//导入先前创建的Product组件
    import axios from "axios"
    export default {
        name: "ProductList",
        data(){
            return{
                prodList:[] ,
                //current表示当前页码
                current:1,
                size:4,
                //表示当前页显示的产品列表
                showList:[]
            }
        },
        components: {product:Product},
        computed:{
            //tatal表示总共有多少商品
          total(){
              return this.product.length;
          }
        },
        //mounted函数是vue组件的生命周期钩子函数，该函数在HTML模板渲染完成后调用
        mounted(){
            if(this.$store.state.loginuser == ''){
                this.$router.push("/");
            }
            else {
                //res为后端返回的数据，这段代码意为：如果loginuser不是空，则前端向后端请求数据交互
                //此时商品列表prodList就等于发送至后端（data）返回至前端（res）的数据
                axios.post("http://localhost:8080/api/getproductlist").then((res)=>{
                    this.prodList = res.data;
                })
            }
        },
        methods:{
            //登出其实就是判断有无cookie，同时把state保存的loginuser的值清空
            logout(){
                if(this.$cookies.isKey('username')){
                    this.$cookies.remove('username');
                }
                this.$store.commit("setLoginUser","");
            },
            //change为页码发生改变时执行的函数
            //val表示当前页码
            //该函数功能是根据当前页面计算后将prodList中相应的产品放到showList中
            change(val){
                this.current = val;
                this.showList = [];
                for(var i=0;i<=this.size;i++){
                    //1定义索引的长度
                    var index =(this.current-1)*this.size+i
                    //2判断索引是否小于商品列表的长度
                    if(index < this.prodList.length){
                        var prod = this.prodList[index];
                        this.showList.push(prod)
                    }
                    else
                        break;

                }
            }
        }
    }
</script>

<style scoped>

</style>