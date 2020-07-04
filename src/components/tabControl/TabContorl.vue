<template>
  <div class="tabcontrol">  
    <div v-for="(item,i) in titles" :key="i" class="tab-item" >
        <span :class="{active:i==cruentIndex}" @click="tabClick(i)">{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabcontrol',
  props:{
      titles:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data () {
    return {
     cruentIndex:0
    }
  },
  methods:{
    tabClick(val){
      this.cruentIndex=val
      this.$emit('tabclick',val)
    }
  }

}
</script>
<style scoped>
  .tabcontrol {
    display: flex;
    text-align: center;
    font-size: .373333rem;
    height: 1.066667rem;
    line-height: 1.066667rem;
    color: #666666;
    background: #ffffff;
  }
  .tab-item {
    flex:1;
  }
  .tab-item .active{
    color: #ff8e97;
    padding: 3px 3px;
    border-bottom: 2px solid #ff699c;
  }
</style>
