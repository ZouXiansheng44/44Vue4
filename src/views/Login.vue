<template>
    <div class="login">
        <h3>用户登陆</h3>
        <p>
            <Input prefix="md-person" v-model="username" placeholder="请输入用户名" style="width: 300px" />
        </p>
        <p>
            <!--<Input prefix="logo-designernews" v-model="value"  placeholder="请输入密码" style="width: 300px" />-->
            <!--<Icon type="logo-dribbble" />-->
            <Input prefix="ios-key" v-model="password"  placeholder="请输入密码" style="width: 300px" />
        </p>
        <p><Checkbox v-model="save">登陆名和密码保存一周</Checkbox></p>
        <p>
            <Button  type="primary" @Click="doLogin()">登陆</Button>
            <Button type="primary" to="/register">注册</Button>
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Login",
        data(){
            return{
                username:"",
                password:"",
                save:false
            }
        },
        methods:{
           doLogin(){
               axios.post("http://localhost:8080/api/login",{username:this.username,password:this.password})
                   .then((res)=>{
                       if(res.data){
                           if(this.save){

                               this.$cookies.set("username",this.username,'7d');
                           }
                          this.$store.commit('setLoginUser',this.username);
                           this.$router.push('/productlist');
                       }
                       else
                       {
                           alert("用户名密码错误,请重新输入");
                           this.username='';
                           this.password='';
                       }
                   })
           }
        }
    }
</script>

<style scoped>

</style>