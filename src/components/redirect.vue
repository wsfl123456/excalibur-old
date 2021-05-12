<template>
  <div class="redirect-box">
    <p>当前打开路由"{{ route }}"为新路由, 请在新前端系统打开此路由</p>
    <p>若仍需访问，请手动点击路由地址<a :href="origin">{{ origin }}</a> 打开</p>
  </div>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route.query.route;
    },
    origin() {
      return this.$route.query.origin;
    }
  }
};
</script>

<style>
  .redirect-box {
    margin: 100px auto;
    align-items: center;
    text-align: center;
    font-size: 30px;
    width: 1000px;
    height: 400px;
    border: 1px solid black;
    padding-top: 100px;
  }
</style>
