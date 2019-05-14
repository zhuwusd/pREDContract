<template>
  <div class="err-content">
    <div class="err-bg">
      <slot name="pic"></slot>
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .err-content{
    position:relative;
    top:0;
    left: 0;
    display: flex;
    width:100%;
    height:100%;
    justify-content: center;
    align-items: center;
  }
  .err-bg{
    width:60%;
    height:40%;
  }
</style>
