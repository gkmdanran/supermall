<template>
  <div class="navtop">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'navtop',
  data () {
    return {
     
    }
  },
  methods:{

  }

}
</script>
<style scoped>
  .navtop{
    display: flex;
    width: 100%;
    height: 1.173333rem;
    line-height: 1.173333rem;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100,0.1);
  }
  .left,
  .right  {
    width: 1.6rem;
  }

  .center {
    flex: 1;
  }
</style>
