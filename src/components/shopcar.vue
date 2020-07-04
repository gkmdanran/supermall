<template>
  <div id="shopcar">  
    <navtop class="car-nav" ref="top">
      <p slot="center" class="top">购物车({{this.$store.state.carList.length}})</p>
    </navtop>
    <scroll class="cnt" ref="scroll" :probe-type="3">
      <div class="good" v-for="(x,i) in carList" :key="i">
          <input type="checkbox" :checked="x.isChecked" @change="changeChecked(x.iid)">
          <img :src="x.image" alt="">
          <div class="txt">
            <div class="title">{{x.title}}</div>
            <div class="desc">{{x.desc}}</div>
            <div class="det">
              <div class="price">￥{{x.price}}</div>
              <div class="count">X{{x.count}}</div>
            </div>
          </div>
      </div>
    </scroll>
    <div class="total">
      <input type="checkbox" :checked="allchecked" @change="changeAll">全选&nbsp;&nbsp;合计&nbsp;&nbsp;￥{{totalmoney.toFixed(2)}}
      <button>去计算({{totalcount}})</button>
    </div>
    
  </div>
</template>
<script>
import navtop from './navbar/navtop'
import scroll from './scroll/scroll'
export default {
  name: 'shopcar',
  data () {
    return {
     carList:[],
     totalmoney:0,
     totalcount:0,
     allchecked:false
    }
  },
  methods:{
    changeChecked(iid){
       this.$store.commit('changeChecked',iid)
       this.carList=this.$store.state.carList
       this.isAllChecked()
       this.getCount()
       this.getMoney()
    },
    getCount(){
      var count=0
      for(let x of this.carList){
        if(x.isChecked==true){
          count++
        }
      }
      this.totalcount=count
    },
    getMoney(){
      var money=0
      for(let x of this.carList){
        if(x.isChecked==true){
          money+=x.price*x.count
        }
      }
      this.totalmoney=money
    },
    isAllChecked(){
      var count=0
      for(let x of this.carList){
        if(x.isChecked==true){
          count++
        }
      }
      if(this.carList.length!=0&&count==this.carList.length)
        this.allchecked=true
      else
        this.allchecked=false
    },
    changeAll(){  
      this.allchecked=!this.allchecked
      this.$store.commit('changeAll',this.allchecked)
      this.getCount()
    this.getMoney()
    }
  },
  components:{
    navtop,
    scroll
  },
  created(){
    this.carList=this.$store.state.carList
    this.getCount()
    this.getMoney()
    this.isAllChecked()
  }
}
</script>
<style scoped>
    #shopcar {
        height: 100%;
        overflow: hidden;
    }
  .top {
    font-weight: 700;
    color: #ffffff;
    font-size: .48rem;
    letter-spacing: 5px;
    }
    .car-nav{
  
      background-color: #ff8e97;
    }
    .good {
      height: 2.666667rem;
      padding:.266667rem;
      border-bottom: 1px solid #cccccc;
    
    }
    .good img {
      
      width: 1.6rem;
      height: 100%;

      border-radius: .133333rem;
      vertical-align: middle;
      margin-right: .266667rem;
    }
    .good input {
      vertical-align: middle;
      margin-right: .133333rem;
    }
    .txt {
      float: right;
      position: relative;
      width: calc(100% - 2.4rem);
      height: 100%;
    }
    .title {
      font-size: .4rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: .266667rem;
    }
    .desc {
      font-size: .32rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #cccccc;
    }
    .det{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .price {
      font-size: .373333rem;
      color: red;
      float: left;
    }
    .count {
      font-size: .373333rem;
      float: right;
    }
    .cnt {
      
      height: calc(100% - 2.24rem);
     
      overflow: hidden;
    }
    .total {
      height: 1.066667rem;
      background: #ededed;
      line-height: 1.066667rem;
      padding: 0 .266667rem;
      font-size: .346667rem;
    }
    .total input{
      vertical-align: middle;
      margin-right: .133333rem;
    }
    .total button{
      width: 2.666667rem;
      float: right;
      outline: none;
      border: 0;
      background-color: #ff5302;
      color: #ffffff;
      font-size: .373333rem;
    }
</style>
