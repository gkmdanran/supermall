<template>
  <div class="goodsitem">  
      
      <img v-lazy="showImage" alt="" @load="imgLoad">
     
          <p class="title">{{good.title}}</p>
          <span class="price">{{good.price}}</span>
          <span class="collect"><van-icon name="star-o" />{{good.cfav}}</span>
      
  </div>
</template>
<script>
export default {
  name: 'goodsitem',
  props:{
      good:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  data () {
    return {
     
    }
  },
  methods:{
      imgLoad(){
          if(this.$route.path=='/home')
            this.$bus.$emit('itemImageLoad')
          if(this.$route.path=='/detail')
            this.$bus.$emit('detailitemImageLoad')
      }
  },
  computed:{
      showImage(){
          return this.good.image||this.good.show.img
      }
  }

}
</script>
<style scoped>
    .goodsitem {
        margin-top: .266667rem;
        text-align: center;
        min-width: 0;
    }
    .goodsitem img {
        width: 95%;
        border-radius: 10px;
    }
    .title {
        margin-top: .266667rem;
        margin-bottom: .133333rem;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
        padding: 0 5px;
        font-size: .373333rem;
        color: #666666;
    }
    .price {
        color:#ff699c;
        font-size: .32rem;
        margin-right: .133333rem;
        margin-left: -0.133333rem;
    }
    .collect {
         font-size: .32rem;
    }
</style>
