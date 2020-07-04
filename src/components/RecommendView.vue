<template>
  <div id="recommend">  
   <div v-for="(item,i) in recommends" :key="i" class="rec">
       <a :href="item.link">
           <img :src="item.image" alt="">
           <div class="txt">{{item.title}}</div>
       </a>
   </div>
  </div>
</template>
<script>
export default {
  name: 'recommend',
  props:{
      recommends:{
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
  methods:{

  }

}
</script>
<style scoped>
 #recommend {
     margin-top:.266667rem;
     width: 100%;
     display: flex;
     padding-bottom: .266667rem;
     background: #ffffff;
 }
 .rec {
    height: 100%;
    text-align: center;
 }
 .rec img {
     width: 80%;
 }
.txt {
    color:#838789;
    font-size: .346667rem;
    margin-top: .133333rem;
}
</style>
