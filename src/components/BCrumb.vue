<!--面包屑组建-->
<template>
  <Breadcrumb separator=">" class="b-crumb" :class="noMb ? 'no-mb' : ''">
    <BreadcrumbItem v-for="(item, idx) in list" :key="idx" :to="item.url">{{item.label}}</BreadcrumbItem>
    <!--<BreadcrumbItem>Components</BreadcrumbItem>-->
    <!--<BreadcrumbItem>Layout</BreadcrumbItem>-->
  </Breadcrumb>
</template>

<script>
  export default {
    name: 'b-crumb',
    props: {
      noMb: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {

    }
  }
</script>

<style scoped lang="less">
  .b-crumb {
    margin-bottom: 16px;
    &.no-mb {
      margin-bottom: 0;
    }
  }
</style>
