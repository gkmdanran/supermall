<template>
  <div id="bottom">  
    <div class="icons iconfont" :class="{'active':'home'==cruentPah}" @click="navClick('home')">&#xe60b;<p>首页</p></div>
    <div class="icons iconfont" :class="{'active':'kinds'==cruentPah}" @click="navClick('kinds')">&#xe60d;<p>分类</p></div>
    <div class="icons iconfont" :class="{'active':'shopcar'==cruentPah}" @click="navClick('shopcar')">&#xe60c;<p>购物车</p></div>
    <div class="icons iconfont" :class="{'active':'mine'==cruentPah}" @click="navClick('mine')">&#xe60a;<p>我的</p></div>
  </div> 
</template>
<script>
export default {
  name: 'bottom',
  data () {
    return {
     cruentPah:'home'
    }
  },
  methods:{
    //导航跳转
    navClick(val){    
      this.cruentPah=val
      this.$router.push({
        path:'/'+val
      })
    }
  },
  mounted(){
     this.cruentPah=this.$route.path.split('/')[1]
  },
  watch:{
    '$route':function(){
       this.cruentPah=this.$route.path.split('/')[1]
    }
  }

}
</script>
<style scoped>
  #bottom {
     padding-top: .08rem;
      border-top: 1px solid #cccccc;
      width: 100%;
      height: 1.306667rem;
      display: flex;
      box-shadow: 0 -2px 10px 3px rgba(0, 0, 0, 0.2);
  }
  .icons{
      text-align: center;
      flex: 1;
      font-size: .64rem;
      
  }
  .icons p {
      font-size: .32rem;
      margin-top: .133333rem;
  }
  .active {
    color: #fe6978;
  }
</style>
