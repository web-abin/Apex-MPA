<template>
  <div class="page">
    <h1>子页面2</h1>
    <span>第二页</span>
    <van-button type="primary" @click="goNext">上一页</van-button>
  </div>
</template>

<script setup>
const router = useRouter()

const goNext = () => {
  router.go(-1)
}
</script>
<style lang="scss">
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
span {
  display: block;
  margin: 20px;
}
</style>
