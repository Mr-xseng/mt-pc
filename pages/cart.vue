<template>
  <div class="page-cart">
    <el-row>
      <el-col
        v-if="cart.length"
        :span="24"
        class="m-cart"
      >
        <list :cat-data="cart"/>
        <p>
          应付金额: <em class="money">¥ {{ total }}</em>
        </p>
        <div class="post">
          <el-button
            type="primary"
            @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col
        v-else
        class="empty"
      >
        购物车为空
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import List from '../components/cart/list.vue'
  import axios from 'axios'
  export default {
    layout:'blank',
    components:{
      List
    },
    data(){
      return {
        cart:[]
      }
    },
    computed:{
      total(){
        let total=0;
        this.cart.forEach(item=>{
          total+=item.price*item.count
        })
        return total
      }
    },
    async asyncData(ctx){
      //请求购物车数据
      let {status,data:{code,data:{name,price}}}=await ctx.$axios.post('/cart/getCart',{
        //获取购物车ID
        id:ctx.query.id
      })
      if(status===200&&code===0&&name){
        return {
          cart:[{
            name,
            price,
            count:1
          }],
          cartNo:ctx.query.id
        }
      }
    },
    methods:{
      //提交付款
      submit:async function () {
        //创建订单
        let {status,data:{code,id}} = await axios.post('/order/createOrder', {
          count:this.cart[0].count,
          price:this.cart[0].price,
          id:this.cartNo
        })
        if (status===200&&code===0){
          this.$alert(`您已成功下单,订单号为${id}`,`下单成功`,{
            confirmButtonText:'确定',
            callback:action => {
              location.href = '/order'
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/css/cart/index.scss";
</style>
