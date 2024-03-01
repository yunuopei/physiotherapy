<script lang="ts" setup>
</script>

<template>
  <div class="appRouter">
    <RouterView/>
  </div>
</template>

<style lang="less">
.appRouter {
  width: 100%;
  height: 100%;
}

/deep/ html {
  width: 100%;
  height: 100%;

  body {
    width: 100%;
    height: 100%;
  }
}

</style>
