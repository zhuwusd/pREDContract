<template>
  <div class="err-content">
    <error-page>
      <div slot="pic" class="err-img"></div>
      <p slot="text" class="err-text">HTTP 504 错误 – 网关超时 (Gateway timeout)<span @click="toHomoe">首页</span></p>
    </error-page>
  </div>
</template>

<script>
import ErrorPage from '@/error/error'
export default {
  name: 'errorpage-504',
  data: function () {
    return {
    }
  },
  methods: {
    toHomoe() {
      let token = localStorage.getItem('lqms-app-token')
      if (token !== undefined) {
          this.$router.push({name: 'login'})       
      }
    }
  },
  components: {
    ErrorPage
  }
}
</script>

<style scoped>
  .err-content{
    display: flex;
    width:100%;
    height:100%;
    justify-content: center;
    align-items: center;
  }
  .err-img {
    width:100%;
    height:70%;
    background:url("../assets/images/err.png") center no-repeat;
    background-size:contain;
  }
  .err-text{
    padding-top:20px;
    line-height:26px;
    font-size:16px;
    text-align: center;
  }
  .err-text span{
    color:#193072;
    text-decoration: underline;
    padding-left:3px;
    cursor:pointer;
  }
</style>
