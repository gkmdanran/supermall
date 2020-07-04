<template>
  <div class="toast" v-show="show">  
   <div>{{message}}</div>
  </div>
</template>
<script>
export default {
  name: 'toast',
  data () {
    return {
     message:"",
     show:false,
    }
  },
  methods:{
      shows(message,duration=2000){
          this.show=true
          this.message=message
          setTimeout(()=>{
              this.show=false
              this.messag=''
          },duration)
      }
  }

}
</script>
<style scoped>
    .toast{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: .48rem;
        color: #ffffff;
        background-color: rgba(0,0,0,0.5);
        padding: .266667rem;
        border-radius: .133333rem;
    }
</style>
