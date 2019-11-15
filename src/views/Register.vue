<template>
    <div class="register">
        <h3>用户注册</h3>
        <p>
        <!--<   @on-blur是失焦事件，当光标不在这个文本框时才会启动这个函数       -->
            <Input prefix="md-person" v-model="username" @on-blur="validateUser()" placeholder="请输入用户名" style="width: 300px" />
            <span>{{errormsg1}}</span>
        </p>
        <p>
            <Input prefix="ios-key" v-model="password" @on-blur="validatePass()" placeholder="请输入密码" style="width: 300px" />
            <span>{{errormsg2}}</span>
        </p>
        <p>
            <Input prefix="ios-key" v-model="passagain" @on-blur="validatePass2()" placeholder="请再次输入密码" style="width: 300px" />
            <span>{{errormsg3}}</span>
        </p>
        <p>
            <Button class="primary" @click="doRegister()">注册</Button>
            <Button class="primary">重置</Button>
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Register",
        data(){
            return{
                username:"",
                password:"",
                passagain:"",
                errormsg1:"",
                errormsg2:"",
                errormsg3:""
            }
        },
        methods:{
            validateUser(){
                let valid=true;
                if(this.username==''){
                    errormsg1="用户名不能为空";
                    valid=false;
                }
                 else{
                     axios.get("http://localhost:8080/api/isexist",{params:{username:this.username,password:this.password}})
                         .then((res)=>{
                             if(res.data)
                                     this.errormsg1="用户名已存在"
                                 valid=false;
                         })
                }
                 if(valid==true){
                     this.errormsg1="";
                     return valid;
                 }
            },
            validatePass(){
                let valid=true
                if(this.password==""){
                    this.errormsg2="密码不能为空";
                    valid=false;
                }else {
                    //1.定义好一个用于测试密码的正则表达式
                    var reg= RegExp(/^\w{6,16}$/)
                    //2.测试密码是否符合正则表达式
                    valid=reg.test(this.password)
                    //3.返回结果，如果不符合正则表达式则输出提示信息
                    if(!valid)
                        this.errormsg2="密码需为6-16位字符"
                }
                if (valid){
                    this.errormsg2="";
                    return valid;
                }
            },
            validatePass2(){
                let valid=true
                if (this.passagain==""){
                    this.errormsg3="请输入确认密码";
                    valid=false;
                } else {
                    if (this.passagain!=this.password){
                        valid=false;
                        this.errormsg3="两次密码不一致，请重新输入"
                    }
                }if (valid){
                    this.errormsg3="";
                    return valid;
                }
            },
            //这个函数的目的是为了向doRegister（）这个函数传递结果用的，定义validata1，validata2，validata3，使这三者与validateUser()
            //validatePass()，validatePass2()三个函数的返回值相等
            validata(){
                let validata1=this.validateUser();
                let validata2=this.validatePass();
                let validata3=this.validatePass2();
                return validata1&&validata2&&validata3
            },
            //写逻辑处理代码时，一定要先想好每一步的逻辑是什么（即每一步要做什么）
            doRegister(){
                //如果三者符合则执行后台数据交互
                if(this.validata()){
                    //.post向后台传递数据
                    axios.post("http://localhost:8080/api/register",{username:this.username,password:this.password})
                        .then((reg)=>{
                            if (reg.data){
                                alert("注册成功，即将跳转到登陆页面");
                                this.$router.push("/login");
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>