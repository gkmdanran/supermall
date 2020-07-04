<template>
  <div class="goodslist">  
     <goods-item v-for="(item,i) in goods" :key="i" :good="item" class="item" @click.native="toDetail(item.iid)"/>
  </div>
</template>
<script>
import GoodsItem from './GoodsItem'
export default {
  name: 'goodslist',
  props:{
      goods:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data () {
    return {
     
    }
  },
  components:{
    GoodsItem
  },
  methods:{
    toDetail(val){
      if(val){
         this.$router.push({
        path:'/detail',
        query:{
          iid:val
        }
      })
      }
     
    }
  }

}
</script>
<style scoped>
    .goodslist{
        width: 100%;     
        display: flex;  
        flex-wrap: wrap;
       
    }
    .item{
        flex: 50%;
    }
</style>
