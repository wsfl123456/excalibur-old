<template>
  <div class="loading-pop">
    <Spin fix size="large"></Spin>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: {}
  }
</script>

<style scoped lang="less">
  .loading-pop {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 900;
  }
</style>
