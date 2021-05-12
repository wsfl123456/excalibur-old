<template>
  <div id="app">
    <!-- <router-view :key="$route.fullPath" /> -->
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
    }
  }
</script>

<style lang="less">
#app {
  font-family: abel, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", '微软雅黑', "Songti SC", '宋体', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
