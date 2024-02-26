<template>{{ test }}</template>

<script setup>
const test=ref('Composition API 自动引入')
  console.log( test.value)
</script>
<style lang="scss">
#app {
  font-family: PingFangSC-Regular;
  font-size: 4vw;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
