<template>
    <div class="index">
        <nav>
            <router-link to="/login">登陆</router-link>
            <router-link to="/register">注册</router-link>
        </nav>
        <div class="main">
            欢迎进入我的MALl
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        //注意mounted函数是vue组件的生命周期钩子函数，该函数在html模板渲染完成后调用
        //不亮的原因可能是因为没有经常调用这个mounted()函数，但不影响这个函数运行
        //该函数的作用是动态修改数据
        mounted(){
            console.log('oo');
            if (this.$cookies.isKey('username')) {
                let loginuser = this.$cookies.get('username')
                this.$store.commit('setLoginUser',loginuser);
                this.$router.push("/productlist");
            }
        }
    }
</script>

<style scoped>
    .index{width:1000px; height:90%; background:url('/images/index.jpg'); margin:0 auto;}
</style>