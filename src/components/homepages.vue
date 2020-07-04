<template>
  <div id="homepages">  
    <div class="content">
      <keep-alive include="home">
        <router-view/>
      </keep-alive>
    </div>
    <div class="bottom">
      <bottom></bottom>
    </div>
    
  </div>
</template>
<script>
import bottom from './bottom'
export default {
   
  name: 'homepages',
  data () {
    return {
     
    }
  },
  components:{
      bottom
  },
  methods:{

  }

}
</script>
<style scoped>
  #homepages {
    width: 100%;
    height: 100%;
  }
  .bottom{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .content {
    width: 100%;
    height: calc(100% - 1.306667rem);
   
  }
</style>
