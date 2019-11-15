import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      //这是两个共享数据（状态），一个状态是数组，一个状态是字符型
      /*
      * 别的组件如果想共享这个状态就要用this.$store.state.list
      * */
      loginuser:'',
      prodList:[],
      cartList:[]
  },
    /*
    * mutations以方法的方式定义了共享数据（状态）的更改
    * 组件中如果想修改共享数据（状态），就要用到commit方法
    * commit方法中有两个参数第一个参数是方法名，要注意跟mutations方法名保持一致
    * 第二个参数就是需要传递的参数
    * this.$store.commit("addCount",1)
    * this.$store.commit("addList",{username:this.username,password:this.password})
    * */
  mutations: {
      setLoginUser(state,obj){
          state.loginuser = obj;
      },
      setProdList(state,obj){
          state.prodList=[];
          state.prodList=obj;
      },
      addCart(state,obj){
          var prop = null;
          prop = state.cartList.find((item)=>{
              return (item.id == obj.id);
          })
          if(prop != undefined)
              prop.count++;
          else
              state.cartList.push(obj);
      },
      deleteCart(state,index){
          state.cartList.splice(index,1);
      }
  },
  actions: {
  },
  modules: {
  }
})
