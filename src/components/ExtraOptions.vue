<!--添加任务资料 组件-->
<template>
  <div>
    <h3 class="sub-form-tit">添加任务资料</h3>
    <div class="extra-info-options">
      <ul class="f-clearfix">
        <li v-for="(_item, _index) in extraOptions" :key="_index">
          <span>{{_item.label}}</span>
          <Icon type="plus-circled" v-if="addedExtra.indexOf(_item.id) < 0" size="24" color="#107cd9" @click.native="addExtraInfo(_item.id)"></Icon>
          <Icon type="minus-circled" v-else size="24" color="#107cd9" @click.native="deductExtraInfo(_item.id)"></Icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'extra-options',
    props: {
      extraOptions: {
        type: Array
      }
    },
    computed: {
      addedExtra () {
        return this.$store.state.selectedExtraOption
      }
    },
    methods: {
      /**
       * 添加任务资料
       * @param {string} type
       */
      addExtraInfo: function (type) {
        this.$store.dispatch('selectExtraOptions', type)
        let param = {
          dataType: type,
          fileName: '',
          fileAddress: ''
        }
        this.$store.dispatch('addExtraData', param)
      },
      deductExtraInfo: function (label) {
        this.$store.dispatch('deductExtraData', label)
      }
    }
  }
</script>

<style scoped lang="less">
  .sub-form-tit {
    color: #66707a;
    font-size: 14px;
    margin-top: 32px;
    margin-bottom: 8px;
  }

  .extra-info-options {
    background-color: #cfebff;
    border-radius: 5px;
    ul {
      li {
        float: left;
        padding: 12px 0 12px 16px;
        color: #343a40;
        font-size: 12px;
        letter-spacing: -1px;
        span {
          color: #343a40;
          font-size: 12px;
          margin-right: 10px;
          display: inline-block;
        }
        i {
          line-height: 1;
          vertical-align: bottom;
        }
      }
    }
  }
</style>
