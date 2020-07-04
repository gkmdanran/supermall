<template>
  <div class="bottombar">  
      <div class="item"><van-icon name="manager-o" /><br>客服</div>
      <div class="item"><van-icon name="shop-o" /><br>店铺</div>
      <div class="item"><van-icon name="star-o" /><br>收藏</div>
      <div class="add" @click="addCar">加入购物车</div>
      <div class="buy">购买</div>
  </div>
</template>
<script>
export default {
  name: 'mine',
  data () {
    return {
     
    }
  },
  methods:{
      addCar(){
          this.$emit("addCar")
      }
  }

}
</script>
<style scoped>
    .bottombar {
        height: 1.306667rem;
        display: flex;
        text-align: center;
    }
    .item {
        padding-top: .133333rem;
        flex: 1;
        font-size: .32rem;
    }
    .item .van-icon{
        font-size:.64rem;

    }
    .add {
        flex:2;
        background-color: yellow;
        line-height: 1.306667rem;
        text-align: center;
        font-size: .346667rem;
    }
    .buy {
        flex:2;
        background-color:#ff9cc3;
        line-height: 1.306667rem;
        color: #ffffff;
        font-size: .426667rem;
        font-weight: 700;
    }

</style>
