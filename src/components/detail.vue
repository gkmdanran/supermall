<template>
  <div class="detail">  
   <navtop class="top" ref="detailtop">
       <div slot="left" class="left" @click="backHome">&lt;</div>
       <div slot="center" class="title">
           <div v-for="(item,i) in titles" :key=i class="title-item" @click="titleClick(i)" :class="{titleColor:i==currentIndex}">{{item}}</div>
       </div>
   </navtop>
   <scroll class="cnt" ref="detailscroll" @scroll="detailScroll" :probe-type="3">
        <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
            <van-swipe-item v-for="x in topImages" :key="x" @load="imageLoad">    
                <img :src="x" alt="" >  
            </van-swipe-item>
        </van-swipe>
        <div class="titles">{{goods.title}}</div>
        <div class="price">
            <span class="now">{{goods.newPrice}}</span>
            <span class="pre">{{goods.oldPrice}}</span>
            <span class="discount" v-show="goods.discount">{{goods.discount}}</span>
        </div>
        <div class="infos">
            <span class="info" v-for="(item,i) in goods.columns" :key="i">{{item}}</span>
        </div>
        <div class="services">
            <div class="service" v-for="(x,i) in goods.services" :key="i" v-show="x.icon">
                <img :src="x.icon" alt="">
                <span>{{x.name}}</span>
            </div>
        </div>
        <div class="logo">
            <img :src="shop.logo" alt="">
            <span class="name">{{shop.name}}</span>
        </div>
        <div class="shopinfos">
            
            <div class="sells">
                {{getCount(shop.sells)}}<br>
                <span class="txt">总销量</span>
            </div>
            <div class="count">
                {{getCount(shop.goodsCount)}}<br>
                <span class="txt">全部宝贝</span>
            </div>
            <div class="descs">
                <div class="list" v-for="(item,i) in shop.score" :key="i">
                    <span>{{item.name}}</span>
                    <span class="score">{{item.score.toFixed(2)}}</span>
                    <span class="green" :class="{red:item.isBetter==true}">{{item.isBetter==true?'高':'低'}}</span>
                </div>
            </div>
        </div>
        <div class="enter">
            <button>进店逛逛</button>
        </div>
        <div class="introduce">
            {{detailInfo.desc}}
        </div>
        <div class="shows" v-for="(x,i) in detailInfo.detailImage" :key="i">
            <div class="title">{{x.key}}</div>
            <img :src="y" alt="" v-for="(y,i) in x.list" :key="i" @load="imageLoad">
        </div>
        <div ref="size">
            <div class="size" v-for="(x,i) in this.goodsParam.size" :key="'i'+i">
                <div class="tr" v-for="(y,j) in x" :key="'j'+j">
                    <div class="td" v-for="(m,k) in y" :key="'k'+k">{{m}}</div>
                </div>
            </div>
        </div>
        <div class="params" >
            <div class="param" v-for="(x,i) in this.goodsParam.infos" :key="i">
                <div class="key">{{x.key}}</div>
                <div class="value">{{x.value}}</div>
            </div>
        </div>
        <div class="comments" ref="comments">
            <div class="title">
                用户评价
                <span>更多</span>
            </div>
            <div class="users">
                <img :src="commentInfo.user.avatar" alt="">
                {{commentInfo.user.uname}}
            </div>
            <div class="content">
                {{commentInfo.content}}
            </div>
            <div class="details">
                <span class="time" v-show="commentInfo.created">{{getTime(commentInfo.created*1000)}}</span>
                <span class="style">{{commentInfo.style}}</span>
            </div>
            <img :src="item" alt="" v-for="(item,i) in commentInfo.images" :key="i">
        </div>
        <goods-list :goods="recommends" ref="recommeneds"></goods-list>
   </scroll>
   <backto class="back" @click.native="backClick" v-show="showback"></backto>
    <bottomBar @addCar="addCar"></bottomBar>
    
  </div>
</template>
<script>
import navtop from './navbar/navtop'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../network/detail'
import scroll from './scroll/scroll'
import GoodsList from './Good/GoodsList'
import bottomBar from './bottomBar'
import {backTopMixin} from '../mixin'
import toast from './toast/toast'
export default {
  name: 'detail',
  mixins:[backTopMixin],
  data () {
    return {
        iid:'',
        titles:['商品','参数','评论','推荐'],
        currentIndex:0,
        topImages:[],
        goods:{},
        detailInfo:{},
        shop:{
            sells:0,
            goodsCount:0
        },
        goodsParam:{},
        commentInfo:{
            user:{
                avatar:''
            }
        },
        topheight:'',
        recommends:[],
        positionArr:[0],
        isShow:false
    }
  },
 
  methods:{
      titleClick(val){
          this.currentIndex=val
           this.$refs.detailscroll.scroll.scrollTo(0,-1*this.positionArr[val],500)
      },
      backHome(){
          this.$router.go(-1)
      },
      imageLoad(){
          if(this.$refs.detailscroll)
            this.$refs.detailscroll.scroll.refresh()
        this.getPosition()
      },
      getPosition(){
        if(this.$refs.detailtop)
        this.topheight=this.$refs.detailtop.$el.offsetHeight
        if(this.$refs.size)
        this.positionArr[1]=this.$refs.size.offsetTop-this.topheight
         if(this.$refs.comments)
        this.positionArr[2]=this.$refs.comments.offsetTop-this.topheight
        if(this.$refs.recommeneds)
        this.positionArr[3]=this.$refs.recommeneds.$el.offsetTop-this.topheight
       
      },
      detailScroll(position){
        if(position.y<=-1000){
            this.showback=true
        }
        else{
            this.showback=false
        }
         const positionY=-position.y
         for(let i in this.positionArr){
             i=i-0
             if((positionY+5)>this.positionArr[i]&&(positionY+5)<this.positionArr[i+1]){
                 this.currentIndex=i
             }
                
         }
         if((positionY+5)>this.positionArr[3])
            this.currentIndex=3
      },
      addCar(){
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realprice
        product.iid=this.iid
        
        this.$store.dispatch('addCar',product).then(res=>{
           this.$gkmtoast.shows(res,1000)
        })
      }
  },
  components:{
      navtop,
      scroll,
      GoodsList,
      bottomBar,
      toast
  },
  created(){
      
      this.iid=this.$route.query.iid
      getDetail(this.iid).then(res=>{
          
          this.topImages=res.result.itemInfo.topImages
          this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
          this.shop=new Shop(res.result.shopInfo)
          this.detailInfo=res.result.detailInfo
          this.goodsParam=new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
          if(res.result.rate.cRate!=0)
            this.commentInfo=res.result.rate.list[0]
          this.$nextTick(function(){
              this.getPosition()
          });
      })
      getRecommend().then(res=>{

          this.recommends=res.data.list     
      })
  },
  mounted(){
    this.$bus.$on('detailitemImageLoad',()=>{
       if(this.$refs.detailscroll)
        this.$refs.detailscroll.scroll.refresh()
    })
  },

  computed:{
      getCount(){
          return (val)=>{
              if(val<10000)
                return val
              else{
                  return val/10000+'万'
              }
          } 
      },
      getTime(t){
          return (t)=>{
                    
                    var time = new Date(t);
                    var y = time.getFullYear();
                    var m = (time.getMonth()+1)<10?'0'+(time.getMonth()+1):(time.getMonth()+1);
                    var d = time.getDate()<10?'0'+time.getDate():time.getDate();
                    return y+'-'+m+'-'+d
          }
      }
  }

}
</script>
<style scoped>
    .detail {
        height: 100%;
        overflow: hidden;
    }
    .top {
        position: relative;
        z-index: 3;
        background-color: #ffffff;
        margin-bottom: 2px;
    }
    .title {
        display: flex;
    }
    .title-item{
        flex:1;
        font-size: .346667rem;
        
    }
    .left {
        font-size: .693333rem;
        font-weight: 700;
        color: #9f9f9f;
    }
    .titleColor{
        color: #ff9cc3;
        font-size: .373333rem;
    }
    .detail .my-swipe {
        text-align: center;
        height: 8rem;
        overflow: hidden;
    }
    .my-swipe img {
        width: 100%;
        /* height: 100%; */
    }
    .titles {
        font-size: .48rem;
        margin-top: .266667rem;
        padding: 0 .266667rem;
    }
    .price{
        padding: 0 .266667rem;
        margin-top: .266667rem;

    }
    .price .now {
        color: #e87f8a;
        font-size: .48rem;
        margin-right: .133333rem;
    }
    .price .pre {
        text-decoration: line-through;
        color: #9b9b9b;
        margin-right: .133333rem;
    }
    .price .discount {
        background: #ef6c83;
        color: #ffffff;
        padding: .053333rem .133333rem;
        border-radius: .24rem;
        font-size: .32rem;
        vertical-align: top;
    }
    .infos{
        margin-top: .533333rem;
        margin-left: .266667rem;
        margin-right: .266667rem;
        padding-bottom: .266667rem;
        display: flex;
        border-bottom: 1px solid #cccccc;
    }
    .info {
        flex:1;
        color: #9b9b9b;
        text-align: center;
        font-size: .32rem;
    }
    .info:first-child{
        text-align: left;
    }
    .info:last-child{
        text-align: right;
    }
    .services {
        margin: 0 .266667rem;
        margin-top: .533333rem;
        padding-bottom: .533333rem;
        border-bottom: 3px solid #f3f3f3;
        display: flex;
        flex-direction:row ;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .service {
        margin-bottom: .213333rem;
    }
    .service img {
        width: .32rem;
        vertical-align: middle;
        margin-right: 2px;
    }
    .service span {
        font-size: .32rem;
    }
    .cnt {
        height: calc(100% - 2.48rem);   
        overflow: hidden;
        }
    .logo {
        padding: 0 .266667rem;
        margin-top: .8rem;
        height: 1.333333rem;
        line-height: 1.333333rem;
        font-size: .373333rem;
        color: #6d6d6d;
    }
    .logo img {
        width: 1.333333rem;
        border-radius: 50%;
        border: 1px solid #cccccc;
        vertical-align: middle;
        margin-right: .266667rem;   
    }
    .shopinfos{
        padding: 0 .533333rem;
        margin-top: .4rem;
        /* height: 80px; */
       
        display: flex;
    }
    .sells,
    .count{
        flex: 1;
        text-align: center;
        font-size: .373333rem;
        padding: .533333rem 0;
    }
    .count{
        position: relative;
    }
    .count::after{
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -.533333rem;
        content: "";
        display: block;
        width: 1px;
        height: 1.066667rem;
        background-color:#f3f3f3;
    }
    .descs {
        flex: 2;
        padding: .4rem 0;
        text-align: center;
        font-size: .32rem;
        line-height: .426667rem;
    }
    .txt {
        font-size: .32rem;
        margin-top: .133333rem;
    }
    .list {
        font-size: .32rem;
    }
    .descs .score{
        margin: 0 .133333rem;
    }
    .descs .green {
        background-color:#629b3e;
        color: #ffffff;
    }
    .descs .red {
        background-color:#e4584d!important;
    }
    .enter{
        margin: 0 .266667rem;
        text-align: center;
        padding-bottom: .8rem;
        border-bottom: 3px solid #f3f3f3;
    }
    .enter button {
        width: 3.2rem;
        height: .8rem;
        border: 0;
        outline: 0;
        border-radius: 0.4rem;
        background-color: #dddddd;
        font-size: .346667rem;
    }
    .introduce{
        padding: 0 .266667rem;
        margin: .533333rem 0;
        font-size: .32rem;
        line-height: .373333rem;
    }
    .shows .title {
        font-size: .373333rem;
        margin: .4rem 0;
        padding-left: .266667rem;
    }
    .shows img {
        width: 100%;
    }
    .size { 
        margin: 0 .533333rem;
        margin-top: .4rem;
        border-top: 3px solid #f3f3f3;
        text-align: left;
        font-size: .346667rem;
       
    }
    .tr {
        display: flex;
        height: .8rem;
        line-height: .8rem;
        border-bottom: 1px solid #cccccc;
    }
    .tr:last-child{
        border: 0;
    }
    .td{
        flex: 1;
    }
    .params{
        margin: 0 .533333rem; 
        border-top: 3px solid #f3f3f3;
    }
    .param{
        width: 100%;
        border-bottom: 1px solid #cccccc;
        display: table;
        font-size: .346667rem;
        padding: 15px 0;
    }
    .key{
        width: 20%;
        display: table-cell;
	    vertical-align: middle;
    }
    .value {
        width: 80%;
        display: table-cell;
        vertical-align: middle;
        color: #f095a8;
    }
    .comments {
        border-top: 3px solid #f3f3f3;
        margin: 0 .266667rem;
        margin-top: .4rem;
        
       
    }
    .comments .title{
        height: 1.333333rem;
        line-height: 1.333333rem;
        border-bottom: 1px solid #cccccc;
        font-size: .373333rem;
        position: relative;
    }
    .comments .title span {
        position: absolute;
        right: 0;
        font-size: .373333rem;
    }
    .comments .users {
        font-size: .373333rem;
    }
    .comments .users img {
        width: 1.333333rem;
        border-radius: 50%;
        border: 1px solid #cccccc;
        vertical-align: middle;
        margin-right: .266667rem;
        margin-top: .4rem;  
    }
    .comments .content{
        margin-top: .266667rem;
        font-size: .346667rem;
        color: #737373;
        line-height: .48rem;
    }
    .comments .details {
        margin: .213333rem 0;
        font-size: .266667rem;
        color: #bfbfbf;

    }
    .comments .time{
        margin-right: .133333rem;
    }
    .comments img {
        width: 2.666667rem;
        margin-right: .133333rem;
        vertical-align: top;
    }
     .back {
    position: fixed;
    bottom: 1.706667rem;
    right: .4rem;
  }
</style>
