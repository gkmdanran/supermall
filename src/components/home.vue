<template>
  <div id="home">  
    <navtop class="home-nav" ref="top">
      <p slot="center" class="top">购物街</p>
    </navtop>
   
    <div class="body">
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabclick="tabClick" ref="tabcontrol1" v-show="isTabFixed"></tab-control>
     <scroll class="cnt" ref="scroll" :probe-type="3" @scroll="homeScroll" :pull-up-load="true" @pullingUp="homePulling">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="x in banners" :key="x.acm">
          <a :href="x.link">
            <img :src="x.image" alt="" @load="bannerLoad">
          </a>    
        </van-swipe-item>
      </van-swipe>
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- <feature-view/> -->
      <tab-control :titles="['流行','新款','精选']"  @tabclick="tabClick" ref="tabcontrol"  v-show="!isTabFixed"></tab-control>
      <goods-list :goods="goods[type].list"/>
      
     </scroll>
     <backto class="back" @click.native="backClick" v-show="showback"></backto>
    </div>
  </div>
</template>
<script>
import navtop from './navbar/navtop'
import {getHomeMultidata,getHomeGoods} from "../network/home.js"
import RecommendView from './RecommendView'
import FeatureView from './FeatureView'
import TabControl from './tabControl/TabContorl'
import GoodsList from './Good/GoodsList'
// import vueWaterfallEasy from 'vue-waterfall-easy'
import scroll from './scroll/scroll'
import {backTopMixin} from '../mixin'
export default {
  name: 'home',
  mixins:[backTopMixin],
  data () {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      type:'pop',
      
      tabOffset:0,
      isload:false,
      isTabFixed:false
    }
  },
  components:{
    navtop,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    scroll,
    
    
  },
  methods:{
    getGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
        
      })
    },
    tabClick(val){
      
      if(val==0)
        this.type='pop'
      else if(val==1)
        this.type="new"
      else
        this.type='sell'
      this.$refs.tabcontrol1.cruentIndex=val
      this.$refs.tabcontrol.cruentIndex=val
    },
    
    homeScroll(position){
 
      if(position.y<=-1000){
        this.showback=true
      }
      else{
        this.showback=false
      }
      
      this.isTabFixed=(-position.y+this.$refs.top.$el.offsetHeight)>(this.tabOffset)
    },
    homePulling(){
      
      this.getGoods(this.type)
      // this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scroll.finishPullUp()
      
    },
    bannerLoad(){
      if(!this.isload){
        this.tabOffset=this.$refs.tabcontrol.$el.offsetTop
       
        this.isload=true
      }
      
    }
    
  },
  mounted(){
    //获取首页数据
    
    getHomeMultidata().then(res =>{
      // console.log(res)
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')
    this.$bus.$on('itemImageLoad',()=>{
      if(this.$refs.scroll)
        this.$refs.scroll.scroll.refresh()
    })
    
 },
 
}
</script>
<style scoped>
  #home {
    height: 100%;
    overflow: hidden;
  }
  .top {
    font-weight: 700;
    color: #ffffff;
    font-size: .48rem;
    letter-spacing: 5px;
  }
  .home-nav{
 
    background-color: #ff8e97;
  }
  .tab-control {
    position: relative;
    z-index: 3;
  }
  .body {
  
    width: 100%;
    
    height: 100%;
    padding:  .266667rem;
    overflow: hidden;
    padding-top: 0;
  }
  .cnt {
    height:100%;
    overflow: hidden;
  }
  #home .my-swipe {
   
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 10px;
  }
  .my-swipe img {
    width: 100%;
    /* height: 100%; */
  }
  .tst {
    height: 100px;
    background: pink;
  }
  .back {
    position: fixed;
    bottom: 1.706667rem;
    right: .4rem;
  }
</style>
