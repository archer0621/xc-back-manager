<template>
  <div class="error">
    <img src="@/assets/img/404.png" class="error_img"/>
    <a-alert type="error" message="您请求的资源被吃掉了~~~" banner />
    <br/>
    <a-button type="primary" @click="back"> 回到上一级 </a-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
const back = () => {
  router.go(-1)
}
</script>

<style lang="less">
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .error_img {
    width: 500px;
    height: 400px;
  }
}
</style>
