<template>
  <i class="iconfont" :class="'icon-' + icon" :style="{'font-size': size + 'px'}"></i>
</template>

<script>
  export default {
    name: 'e-icon',
    props: {
      icon: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default: 20
      }
    }
  }
</script>

<style scoped lang="less">

</style>
