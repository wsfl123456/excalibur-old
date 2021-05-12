<template>
  <div class="sub-header g-mb-16">
    <b-crumb :list="crumb" no-mb></b-crumb>
    <div class="search">
      <search-plate></search-plate>
    </div>
  </div>
</template>

<script>
  import BCrumb from './BCrumb'
  import SearchPlate from './SearchPlate'
  export default {
    name: 'SubHeader',
    components: {SearchPlate, BCrumb},
    props: {
      crumb: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .sub-header {
    display: flex;
    align-items: center;
    .search {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }

</style>
